
const inputCode = document.querySelector(`.code-input input`);
const convertButton = document.querySelector(`.convert-button`);


convertButton.addEventListener(`click`, () => {
    let code = inputCode.value;

code = code.replace(/\s+/g, ' ').trim();

const codeArray = code.split(` `);
    console.log(codeArray);
});