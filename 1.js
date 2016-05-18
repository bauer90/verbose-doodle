var fs = require("fs");
var buf = new Buffer(1024);
console.log("going to open an existing file!");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("file opened successfully.\nGoing to read the file.");
    fs.ftruncate(fd, 10, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("truncated file.");
        fs.read(fd,buf,0,buf.length,0,function(err,bytes) {
            if(err) {
                console.log(err);
            }
            console.log(bytes + " bytes read");
            if (bytes > 0) {
                console.log(buf.slice(0,bytes).toString());
            }

            fs.close(fd, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("closed successfully");
            })
        });
    });
});


// var data = fs.readFileSync("input.txt");
// console.log("Sync read: " + data.toString());
// console.log("ended.");


// var fs = require("fs");
// var buf = new Buffer(1024);
//
// console.log("Going to open an existing file");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("File opened successfully!");
//    console.log("Going to read the file");
//    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + " bytes read");
//
//       // Print only read bytes to avoid junk.
//       if (bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//    });
// });
