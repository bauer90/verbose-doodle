var rect = {
    perimeter: function (x, y) {
        return (2*(x+y));
    },

    area: function(x, y) {
        return (x*y);
    }
};


function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + " and b = " + b);
    if (l < 0 || b < 0) {
        console.log("rectangle dims should be greater than zero: l = " + l + " and b = " + b);
    }
    else {
        console.log("the area of a rectangle of dims l = " + l + " and b = " + b + " is " + rect.area(l,b));
        console.log("the perimeter of a rectangle of dims l = " + l + " and b = " + b + " is " + rect.perimeter(l,b));
    }
}
solveRect(2,4);
solveRect(-2,4);
