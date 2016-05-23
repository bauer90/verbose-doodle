var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

//var Beer = require('./models/beer');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

var port = process.env.PORT || 3000;
var router = express.Router();

// router.get('/', function(req, res) {
//     res.json({ message: 'You are running dangerously low on beer!'});
// });

// var beersRoute = router.route('/beers');
// beersRoute.post(function(req, res) {
//     var beer = new Beer();
//     beer.name = req.body.name;
//     beer.type = req.body.type;
//     beer.quantity = req.body.quantity;
//     beer.save(function(err) {
//         if (err) res.send(err);
//         res.json({ message: 'Beer added to the locker', data: beer });
//     });
// });

// beersRoute.get(function(req, res) {
//     Beer.find(function(err, beers) {
//         if (err) res.send(err);
//         res.json(beers);
//     });
// });

// var beerRoute = router.route('/beers/:beer_id');
// beerRoute.get(function(req, res) {
//     Beer.findById(req.params.beer_id, function(err, beer) {
//         if (err) res.send(err);
//         res.json(beer);
//     });
// });

// beerRoute.put(function(req, res) {
//     Beer.findById(req.params.beer_id, function(err, beer) {
//         if (err) res.send(err);
//         beer.quantity = req.body.quantity;
//         beer.save(function(err) {
//             if (err) res.send(err);
//             res.json(beer);
//         });
//     });
// });

// beerRoute.delete(function(req, res) {
//     Beer.findByIdAndRemove(req.params.beer_id, function(err) {
//         if (err) res.send(err);
//         res.json({ message: 'beer removed from the locker'});
//     });
// });

router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);


app.use('/api', router);

app.listen(port);
console.log("insert beer on port " + port);
