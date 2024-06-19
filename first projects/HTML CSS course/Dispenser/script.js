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

codeArray.forEach((part) => {
  html += `
Dot ${Number(part)+1} ${Number(part)+1} 0.200 0.000`
});

console.log(html);

};
