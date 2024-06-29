
const prints = [];
const glueBlock = [];
const ploter = [];
const engineers = [];
const urgent = [];
const others = [];


let task = document.querySelector(`.text-input`);

const addButton = document.querySelector(`.add-button`);
const printsButton = document.querySelector(`.print-sort`);
const glueBlockButton = document.querySelector(`.glue-block-sort`);
const ploterButton = document.querySelector(`.ploter-sort`);
const engineersButton = document.querySelector(`.engineers-sort`);
const urgentButton = document.querySelector(`.urgent-units-sort`);


addButton.addEventListener(`click`, () => {
    others.push(task.value);
});

printsButton.addEventListener(`click`, () => {
    prints.push(task.value);
    renderHTML();
});

glueBlockButton.addEventListener(`click`, () => {
    glueBlock.push(task.value);
});

ploterButton.addEventListener(`click`, () => {
    ploter.push(task.value);
});

engineersButton.addEventListener(`click`, () => {
    engineers.push(task.value);
});

urgentButton.addEventListener(`click`, () => {
    urgent.push(task.value);
});

let html = ``;

function renderHTML() {
    html = ``;   
    prints.forEach((task) => {
    html += `
<div class="todo">
<div class="left-part">
<input type="checkbox">
<div class="todo-3d-prints">
    ${task}
</div>
</div>

<div class="right-part">
<button class="button-edit">Edit</button> 
<button class="button-priority">Priority</button>
</div>

</div>
    `; 
});

document.querySelector(`.todo-list-container`).innerHTML = html;
task.value = ``;
}

 






//.glueBlock.ploter.engineers.urgent.others