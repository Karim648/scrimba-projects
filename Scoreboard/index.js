let homePoint = document.getElementById("home");
let awayPoint = document.getElementById("away");
let homeCount = 0;
let awayCount = 0;

function homeOne() {
    homeCount += 1;
    homePoint.innerText = homeCount;
}

function homeTwo() {
    homeCount += 2;
    homePoint.innerText = homeCount;
}

function homeThree() {
    homeCount += 3;
    homePoint.innerText = homeCount;
}

function awayOne() {
    awayCount += 1;
    awayPoint.innerText = awayCount;
}

function awayTwo() {
    awayCount += 2;
    awayPoint.innerText = awayCount;
}

function awayThree() {
    awayCount += 3;
    awayPoint.innerText = awayCount;
}

function newGame() {
    homeCount = 0;
    homePoint.innerText = 0;
    awayCount = 0;
    awayPoint.innerText = 0;
}