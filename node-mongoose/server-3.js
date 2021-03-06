var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dishes-3');
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected correctly to server");
    Dishes.create({
        name: 'Uthapzza',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'this is insane',
                author: 'Matt'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('dish created');
        console.log(dish);
        var id = dish._id;
        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {$set: {description: 'Updated test'}}, {new: true})
                  .exec(function(err, dish) {
                      if(err) throw err;
                      console.log('updated dish');
                      console.log(dish);
                      dish.comments.push({
                          rating: 5,
                          comment: 'I\'m getting a sinking feeling!',
                          author: 'Leonardo di Carpaccio'
                      });
                      dish.save(function(err, dish) {
                          console.log('updated comments!');
                          console.log(dish);
                          db.collection('dishes').drop(function() {
                              db.close();
                          });
                      });
                  });
        },3000);
    });
});
