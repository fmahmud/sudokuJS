var solution = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
];

var currentSolution = new Array();
for(var y = 0; y < 9; y++) {
    currentSolution.push(solution[y]);
}

function replaceAllOccurrencesOfIn(array, before, after) {
    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++) {
            if(array[i][j] == before)
                array[i][j] = "TEMP";
            if(array[i][j] == after) 
                array[i][j] = before;
        }
    }

    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++) {
            if(array[i][j] == "TEMP")
                array[i][j] = after;
        }
    }
}

function randomize() {
    var notModified = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(var i = 0; i < notModified.length; i++) {
        var indexA = Math.floor(Math.random()*notModified.length);
        var numA = notModified[indexA];
        notModified.splice(indexA, 1);
        var indexB = Math.floor(Math.random()*notModified.length);
        var numB = notModified[indexB];
        notModified.splice(indexB, 1);
        replaceAllOccurrencesOfIn(currentSolution, numA, numB);
    }
}

var myVar = setInterval(
    function () {
        myTimer();
    }, 1000);

var seconds = 0;
var minutes = 0;
function myTimer() {
    seconds++;
    if(seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    var secondsAsString = ("00"+seconds.toString()).slice(-2);
    var minutesAsString = ("00"+minutes.toString()).slice(-2);
    document.getElementById("timer").innerHTML = minutesAsString+":"+secondsAsString;
}

var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function solve() {
    for(var y = 0; y < rows.length; y++) {
        for(var x = 0; x < cols.length; x++) {
            makeCoordinateVisible(rows[y]+cols[x]);
        }
    }
}

function clearAll() {
    for(var y = 0; y < rows.length; y++) {
        for(var x = 0; x < cols.length; x++) {
            var element = document.getElementById(rows[y]+cols[x]);
            element.value = "";
            element.readOnly = false;
            element.style.color = "#000000";
            element.style.fontWeight = "normal";
        }
    }
}

function makeCoordinateVisible(coordinate) {
    var row = coordinate.charCodeAt(0) - 'A'.charCodeAt(0);
    var column = parseInt(coordinate.charAt(1)) - 1;
    var value = currentSolution[row][column];
    var element = document.getElementById(coordinate);
    if(element.value !== "") {
        return false;
    }
    element.value = value;
    element.readOnly = true;
    element.style.fontWeight = "bold";
    return true;
}

function clearPuzzle() {
    clearAll();
    randomize();
    seconds = 0;
    minutes = 0;
    document.getElementById("timer").innerHTML = "00:00";
    var numShown = 36; //can vary for difficulty (later)
    for(var i = 0; i < numShown;) {
        var cY = Math.floor(Math.random() * 9);
        var cX = Math.floor(Math.random() * 9);
        if(makeCoordinateVisible(rows[cY] + cols[cX]))
            i++;
    }
}

function checkSolution() {
    for(var y = 0; y < rows.length; y++) {
        for(var x = 0; x < cols.length; x++) {
            var element = document.getElementById(rows[y]+cols[x]);
            if(element.value == solution[y][x].toString())
                element.style.color = "#000000";
            else {
                if(element.value !== "")
                    element.style.color = "#993366";
                else
                    element.style.color = "#000000";
            }
        }
    }
}

function onLoad() {
    clearPuzzle();
}