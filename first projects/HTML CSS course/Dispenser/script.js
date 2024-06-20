const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);
let codeArray;

convertButton.addEventListener(`click`, () => {
    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

codeArray = code.split(` `);

 renderNumbers(codeArray);   

console.log(codeArray);
});



let html = ``;

function renderNumbers(codeArray) {

for (i = 0; i < codeArray.leangth; i += 2) {

if (i + 1 < codeArray.length) {

let part1 = Number([i]);
let part2 = Number([i + 1]);

html += `Dot ${part1 + 1} ${part2 + 3} 0.200 0.000`


}

}
console.log(html);
}