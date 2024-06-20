const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {
    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

codeArray = code.split(` `);

 renderNumbers(codeArray);   

});



let html = ``;

function renderNumbers(codeArray) {

for (i = 0; i < codeArray.length; i += 2) {

if (i + 1 < codeArray.length) { 

let part1 = Number(codeArray[i]).toFixed(2);
let part2 = Number(codeArray[i + 1]).toFixed(2);

html += 
`<div>
Dot ${part1 + 1} ${part2 + 3} 0.200 0.000
</div>`
}
}
document.querySelector(`.result`).innerHTML = html;
console.log(codeArray);
}




