

const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {

    const xFiducialAdd = document.querySelector(`.x-fiducial`).value;
    const yFiducialAdd = document.querySelector(`.y-fiducial`).value;
    
    const xPositionRemove = document.querySelector(`.x-position`).value;
    const yPositionRemove = document.querySelector(`.y-position`).value;
    
    const xTotal = Number(xFiducialAdd) - Math.abs(Number(xPositionRemove));
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
/*
const screwType = document.querySelectorAll(`.screw-type`);

screwType.forEach((screwButton) => {
screwButton.addEventListener(`click`, () => {
    if (screwButton.innerHTML === `Screw 2-56`) {
        ChooseScrewType(`256`);
    } else if (screwButton.innerHTML === `Screw 1-64`) {
        ChooseScrewType(`164`);
    } else if (screwButton.innerHTML === `Screw 0-80`) {
        ChooseScrewType(`080`);
    } 
});
});

function ChooseScrewType(screwSize) {
    if (screwSize === `256`) {
        xTotal = xTotal - Number(4);
    } else if (screwSize === `164`) {
        xTotal = xTotal - Number(2);
    } else if (screwSize === `080`) {
        xTotal = xTotal - Number(1);
    }

}

*/


