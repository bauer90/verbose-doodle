var Client = require('../models/client');
exports.postClients = function(req, res) {
    var client = new Client();
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.body._id;
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
