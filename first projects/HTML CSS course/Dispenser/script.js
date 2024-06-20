const xFiducialAdd = document.querySelector(`.x-fiducial`);
const yFiducialAdd = document.querySelector(`.y-fiducial`);

const xPositionRemove = document.querySelector(`.x-position`);
const yPositionRemove = document.querySelector(`.y-position`);


const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {
    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

codeArray = code.split(` `);

   

const XYfiducial = Number(xFiducialAdd.value) + Number(yFiducialAdd.value);
const XYposition = Number(xPositionRemove.value) + Number(yPositionRemove.value);

const totalCalculate = Number(XYfiducial) - Number(XYposition);

renderNumbers(codeArray, totalCalculate);

});



let html = ``;

function renderNumbers(codeArray, totalCalculate) {

for (i = 0; i < codeArray.length; i += 2) {

if (i + 1 < codeArray.length) { 

let part1 = Number(codeArray[i]);
let part2 = Number(codeArray[i + 1]);

const xPosition = (part1 + 1).toFixed(3);
const yPosition = (part2 + 3).toFixed(3);

html += 
`<pre>
Dot       ${xPosition},  ${yPosition},   0.200,   0.000
</pre>`
}
}

document.querySelector(`.result`).innerHTML = html;
console.log(codeArray);
console.log(totalCalculate);
}




