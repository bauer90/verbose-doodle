var oauth2orize = require('oauth2orize');
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');

var server = oauth2orize.createServer();

// register serialization function
server.serializeClient(function(client, callback) {
    return callback(null, client._id);
});

// register deserialization function
server.deserializeClient(function(id, callback) {
    Client.findOne({ _id: id }, function(err, client) {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

// register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
    var code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id
    });
    code.save(function(err) {
        if (err) { return callback(err); }
        callback(null, code.value);
    });
}));

// Exchange authorization codes for access Tokens
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    // first look up to see if the authcode exists.
    Code.findOne({ value: code }, function(err, authCode) {
        if (err) { return callback(err); }
        if (authCode === undefined) { return callback(null, false); }
        if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
        if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

        // auth code found to exist
        // delete auth code now that it has been used
        // so it can't be used again.
        authCode.remove(function(err) {
            if (err) { return callback(err); }
            // create a new access token
            // and tie it to client and user.
            var token = new Token({
                value: uid(256),
                clientId:authCode.clientId,
                userId: authCode.userId
            });

            // save the access token to MongoDB and check for errors
            token.save(function(err) {
                if (err) { return callback(err); }
                callback(null, token);
            });
        });
    });
}));

// user authorization endpoint
exports.authorization = [
    server.authorization(function(clientId, redirectUri, callback) {
        Client.findOne({ id: clientId }, function(err, client) {
            if (err) { return callback(err); }
            return callback(null, client, redirectUri);
        });
    }),

    function(req, res) {
        res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
]


// User decision endpoint
exports.decision = [
    server.decision()
]

// Application client token exchange endpoint
exports.token = [
    server.token(),
    server.errorHandler()
]


function uid(len) {
    var buf = [];
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlen = chars.length;
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen-1)]);
    }
    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}
