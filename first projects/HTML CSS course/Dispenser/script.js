
let screwChoise = 0;

const screwType = document.querySelector(`.screw-type`);

 
screwType.addEventListener(`change`, () => {

    if (screwType.value === `2-56`) {
        screwChoise = 4;
    } else if (screwType.value === `1-64`) {
        screwChoise = 2;
    } else if (screwType.value === `0-80`) {
        screwChoise = 1;
    } 
});


const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {

    const xFiducialAdd = document.querySelector(`.x-fiducial`).value;
    const yFiducialAdd = document.querySelector(`.y-fiducial`).value;
    
    const xPositionRemove = document.querySelector(`.x-position`).value;
    const yPositionRemove = document.querySelector(`.y-position`).value;
    
    const xTotal = (Number(xFiducialAdd) - Math.abs(Number(xPositionRemove)) - Number(screwChoise));
    const yTotal = Number(yFiducialAdd) - Math.abs(Number(yPositionRemove));

    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

codeArray = code.split(` `);

renderNumbers(xTotal, yTotal, codeArray);


});



let html = ``;

function renderNumbers(xTotal, yTotal, codeArray) {

for (let i = 0; i < codeArray.length; i += 2) {

if (i + 1 < codeArray.length) { 

let part1 = Number(codeArray[i]);
let part2 = Number(codeArray[i + 1]);

const xPosition = (part1 + xTotal).toFixed(3);
const yPosition = (part2 + yTotal).toFixed(3);

html += 
`<pre>
Dot       ${xPosition},  ${yPosition},   0.200,   0.000
</pre>`
}
}

document.querySelector(`.result`).innerHTML = html;

console.log(codeArray);
console.log(xTotal);
console.log(yTotal);

}







