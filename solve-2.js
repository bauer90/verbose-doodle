var rect = require('./rectangle-2');
function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + "and b = " + b);
    rect(l,b,function(err,rectangle) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("the area of a rectangle of dims length = " + l + " and breadth = " + b + " is " + rectangle.area());
            console.log("the perimeter of a rectangle of dims length = " + l + " and breadth = " + b + " is " + rectangle.perimeter());
        }
    });
};
solveRect(2,4);

solveRect(-2,4);
