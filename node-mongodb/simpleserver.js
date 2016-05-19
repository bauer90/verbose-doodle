var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log("connected correctly to server");
    var collection = db.collection("dishes");
    collection.insertOne({name: "Uthapizza", description:"test"}, function(err, result) {
        assert.equal(err, null);
        console.log("after insert:");
        console.log(result.ops);
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("found: ");
            console.log(docs);
            db.dropCollection("dishes", function(err, result) {
                assert.equal(err, null);
                db.close();
            });
        });
    });
});
