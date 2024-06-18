
const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);


convertButton.addEventListener(`click`, () => {
    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

const codeArray = code.split(` `);
    
});

let html = ``;

codeArray.forEach((part) => {
   html += `${index} ${index+1} 0.200 9.000`
});