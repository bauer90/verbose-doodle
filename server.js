var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dboper = require('./operations');
var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("connected correctly to server");
    dboper.insertDocument(db, {name: "vadonut", description:"test"}, "dishes", function(result) {
        console.log(result.ops);
        dboper.findDocument(db,"dishes", function(docs) {
            console.log(docs);
            dboper.updateDocument(db, {name: "vadonut"}, {description:"updated test"}, "dishes", function(result) {
                console.log(result.result);
                dboper.findDocument(db, "dishes", function(docs) {
                    console.log(docs);
                    db.dropCollection("dishes", function(result) {
                        console.log(result);
                        db.close();
                    });
                });
            });
        });
    });
});
