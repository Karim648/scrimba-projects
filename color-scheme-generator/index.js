const getColorScheme = document.querySelector("#get-color-scheme");
const seedColor = document.querySelector("#seed-color");
const colorScheme = document.querySelector("#color-scheme");
const hexArr = document.querySelectorAll(".hexcode");
const colorArr = document.querySelectorAll(".color");
console.log(...hexArr);

getColorScheme.addEventListener("click", () => {
    const cleanSeedColor = seedColor.value.replace("#", "");
    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanSeedColor}&mode=${colorScheme.value.toLowerCase()}&count=5`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.colors.length; i++) {
            hexArr[i].textContent = data.colors[i].hex.value;
            colorArr[i].style.backgroundColor = data.colors[i].hex.value;
        }
    })
})

// data.colors is an array of 5 objects that each have a colour based on the scheme we give 

// https://www.thecolorapi.com/scheme?hex=${cleanSeedColor}&format=html&mode=${colorScheme.value}&count=5
// ^ should return a array of colours where we would have to iterate through 
// and get the hex value clean or not idk yet and in order put them in html

// you can use queryselector all on the hexcode class 
// to get an array of all the hexcode classes then iterate through the array

// to change the background colour do .style.backgroundColor = hexcode

