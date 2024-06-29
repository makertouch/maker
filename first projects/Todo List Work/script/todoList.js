
const prints = [];
const glueBlock = [];
const ploter = [];
const engineers = [];
const urgent = [];
const others = [];

const task = document.querySelector(`.text-input`);


const addButton = document.querySelector(`.add-button`);
const printsButton = document.querySelector(`.print-sort`);
const glueBlockButton = document.querySelector(`.glue-block-sort`);
const ploterButton = document.querySelector(`.ploter-sort`);
const engineersButton = document.querySelector(`.engineers-sort`);
const urgentButton = document.querySelector(`.urgent-units-sort`);


addButton.addEventListener(`click`, () => {
    others.push(task.value);
    renderHTML();
});

printsButton.addEventListener(`click`, () => {
    if (task.value) {
        prints.push(task.value);
        renderHTML();
    }
});

glueBlockButton.addEventListener(`click`, () => {
    if (task.value) {
        glueBlock.push(task.value);
        renderHTML();
    }
});

ploterButton.addEventListener(`click`, () => {
    if (task.value) {
        ploter.push(task.value);
        renderHTML();
    }
});

engineersButton.addEventListener(`click`, () => {
    if (task.value) {
        engineers.push(task.value);
        renderHTML();
    }
});

urgentButton.addEventListener(`click`, () => {
    if (task.value) {
        urgent.push(task.value);
        renderHTML();
    }
});

let html = ``;

function renderHTML() {
    let html = ``;

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

    glueBlock.forEach((task) => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-glue-block">
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

    ploter.forEach((task) => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-ploter">
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

    engineers.forEach((task) => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-engineers">
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

    urgent.forEach((task) => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-urgent">
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

    others.forEach((task) => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-others">
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