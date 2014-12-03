//Sodoku.js

function Bucket(type) {
    this.numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    this.removeNumber = function(val) {
        var i = this.numbers.indexOf(val);
        if(i != -1) {
            this.numbers.splice(i, 1);
        }
    };
}


