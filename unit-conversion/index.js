const inputNum = document.getElementById("input-num");
const convertBtn = document.getElementById("convert-btn");
const convertLength = document.getElementById("convert-length");
const convertVolume = document.getElementById("convert-volume");
const convertMass = document.getElementById("convert-mass");



convertBtn.addEventListener("click", function() {
    convertLength.innerHTML = `${inputNum.value} meters = ${getFeet(inputNum.value)} feet | 
    ${inputNum.value} feet = ${getMeters(inputNum.value)} meters`;

    convertVolume.innerHTML = `${inputNum.value} liters = ${getGallons(inputNum.value)} gallons | 
    ${inputNum.value} gallons = ${getLiters(inputNum.value)} liters`;

    convertMass.innerHTML = `${inputNum.value} kilos = ${getPounds(inputNum.value)} pounds | 
    ${inputNum.value} pounds = ${getKilograms(inputNum.value)} kilos`;
});

function getMeters(num) {
    return (num * 0.305).toFixed(3);
}

function getFeet(num) {
    return (num * 3.281).toFixed(3);
}

function getLiters(num) {
    return (num * 3.785).toFixed(3);
}

function getGallons(num) {
    return (num * 0.264).toFixed(3);
}

function getKilograms(num) {
    return (num * 0.454).toFixed(3);
}

function getPounds(num) {
    return (num * 2.204).toFixed(3);
}

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/