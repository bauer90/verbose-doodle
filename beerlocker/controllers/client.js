var Client = require('../models/client');
exports.postClients = function(req, res) {
    var client = new Client();
    
    //  client's major properties
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;

    // req.user is a field defined by passportJS
    client.userId = req.user._id;

    client.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Client added to the locker', data: client });
    });
};

exports.getClient = function(req, res) {
    Client.find({ userId: req.user._id }, function(req, res) {
        if (err) res.send(err);
        res.json(clients);
    });
};
