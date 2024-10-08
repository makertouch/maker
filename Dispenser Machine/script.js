
let screwChoise = 0;

const screwType = document.querySelector(`.screw-type`);
 
screwType.addEventListener(`change`, () => {

    if (screwType.value === `2-56`) {
        screwChoise = 1.9;
    } else if (screwType.value === `1-64`) {
        screwChoise = 1.5;
    } else if (screwType.value === `0-80`) {
        screwChoise = 1.22;
    } else if (screwType.value === `none`) {
        screwChoise = 0;
    } 
}); 

let layer = 0.100;

const layerType = document.querySelector(`.layer-type`);

layerType.addEventListener(`change`, () => {
    if (layerType.value === `100`) {
        layer = 0.100;
    } else if (layerType.value === `200`) {
        layer = 0.200;
    } else if (layerType.value === `300`) {
        layer = 0.300;
    } else if (layerType.value === `400`) {
        layer = 0.400;
    } else if (layerType.value === `500`) {
        layer = 0.500;
    }  else if (layerType.value === `600`) {
        layer = 0.600;
    }
} );


const dotsTab = document.querySelector(`.result-tabs .dots`);
const circlesTab = document.querySelector(`.result-tabs .circles`);

const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {
    copyButton.classList.remove(`copy-button-clicked`);
    const xFiducialAdd = document.querySelector(`.x-fiducial`).value;
    const yFiducialAdd = document.querySelector(`.y-fiducial`).value;
    
    const xMovePosition = eval(document.querySelector(`.x-position`).value || 0);
    const yMovePosition = eval(document.querySelector(`.y-position`).value || 0);
    
    const xTotal = (Number(xFiducialAdd) + Number(xMovePosition) - Number(screwChoise));
    const yTotal = Number(yFiducialAdd) + Number(yMovePosition);

    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();
codeArray = code.split(` `);
renderNumbers(xTotal, yTotal, codeArray);

//For having Dots tab clicked by defult;
dotsTab.classList.add('tab-on');
circlesTab.classList.remove('tab-on');

});


const defaultNum = Number(5.3);
let htmlDots = ``;
let htmlCircles = ``;

function renderNumbers(xTotal, yTotal, codeArray) {

    let lineCounter = -1;
    let screwGroup = 1;

     // added before the loop starts.
    htmlDots += `Begin screws
DotWidth 0.100
Height 0.000
Move Height 0.000
start    0.000,   0.000
`;

for (let i = 0; i < codeArray.length; i += 2) {
if (i + 1 < codeArray.length) {  // if I add 1 to the index - would it be room for one more?

let part1 = Number(codeArray[i]);
let part2 = Number(codeArray[i + 1]);

const xPosition = (part1 + (xTotal - defaultNum)).toFixed(3);
const yPosition = (part2 + (yTotal - defaultNum)).toFixed(3);

lineCounter += 1;

if (lineCounter === 45) {
    htmlDots += `end
Begin screws${screwGroup += 1}
DotWidth 0.100
Height 0.000
Move Height 0.000
start    0.000,   0.000
`;
    lineCounter = 0;
    } 

htmlDots += 
`Dot       ${xPosition},  ${yPosition},   ${layer.toFixed(3)},   0.000\n`;

htmlCircles += 
`Circle   ${xPosition},  ${yPosition},  ${(Number(xPosition) + Number(screwChoise)).toFixed(3)}, ${yPosition},   0.000, 1,   0.000\n`;

}
}

// Added after the loop ends
htmlDots += `end\n`;


document.querySelector(`.result`).innerHTML = `<pre>${htmlDots}</pre>`;

console.log(codeArray);
console.log(xTotal);
console.log(yTotal);
}

// new circles part


const clearButton = document.querySelector(`.clear-button`);

clearButton.addEventListener(`click`, () => {
    copyButton.classList.remove(`copy-button-clicked`);
    htmlDots = ``;
    htmlCircles = ``;
    document.querySelector(`.result`).innerHTML = `
    <div class="result">result will be displayed here</div>`;
});

const copyButton = document.querySelector(`.copy-button`);

copyButton.addEventListener(`click`, () => {
    copyButton.classList.add(`copy-button-clicked`);
    // Create a temporary textarea element
    const tempTextarea = document.createElement(`textarea`);
    
    if (circlesTab.classList.contains(`tab-on`)) {
    tempTextarea.value = htmlCircles;
    } else {
    tempTextarea.value = htmlDots;
    }

    document.body.appendChild(tempTextarea);
    
    // Select the text and copy it to the clipboard
    tempTextarea.select();
    document.execCommand(`copy`);
    
    // Remove the temporary textarea element
    document.body.removeChild(tempTextarea);

});

dotsTab.classList.add('tab-on');

dotsTab.addEventListener(`click`, () => {

document.querySelector(`.result`).innerHTML = `<pre>${htmlDots}</pre>`
 
  dotsTab.classList.add('tab-on');
  circlesTab.classList.remove('tab-on');
  copyButton.classList.remove(`copy-button-clicked`);
 
});



circlesTab.addEventListener(`click`, () => {

document.querySelector(`.result`).innerHTML = `<pre>${htmlCircles}</pre>`;

  circlesTab.classList.add(`tab-on`);
  dotsTab.classList.remove('tab-on');
  copyButton.classList.remove(`copy-button-clicked`);

});
