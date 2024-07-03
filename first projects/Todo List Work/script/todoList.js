const tasks = {
    prints: [],
    glueBlock: [],
    ploter: [],
    engineers: [],
    urgent: [],
    others: []
};

const taskInput = document.querySelector(`.text-input`);

const buttons = {
    addButton: document.querySelector(`.add-button`),
    printsButton: document.querySelector(`.print-sort`),
    glueBlockButton: document.querySelector(`.glue-block-sort`),
    ploterButton: document.querySelector(`.ploter-sort`),
    engineersButton: document.querySelector(`.engineers-sort`),
    urgentButton: document.querySelector(`.urgent-units-sort`)
};


buttons.addButton.addEventListener('click', () => {
    addTaskToCategory('others');
});

buttons.printsButton.addEventListener('click', () => {
    addTaskToCategory('prints');
});

buttons.glueBlockButton.addEventListener('click', () => {
    addTaskToCategory('glueBlock');
});

buttons.ploterButton.addEventListener('click', () => {
    addTaskToCategory('ploter');
});

buttons.engineersButton.addEventListener('click', () => {
    addTaskToCategory('engineers');
});

buttons.urgentButton.addEventListener('click', () => {
    addTaskToCategory('urgent');
});

const tasksList = [];

function addTaskToCategory(category) {
    if (taskInput.value) {
        const newTask = {
            task: taskInput.value,
            category: category,
            timestamp: new Date().getTime()
        };
        tasks[category].unshift(newTask.task);  // Add to the specific category array
        tasksList.unshift(newTask);  // Add to the overall list with timestamp
        renderHTML();
    }
}

function renderHTML() {
    let html = '';

    // Sort tasksList by timestamp in descending order
    const sortedTasks = tasksList.sort((a, b) => b.timestamp - a.timestamp);

    sortedTasks.forEach(newTaskListObj => {
        html += `
<div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-${newTaskListObj.category}">
            ${newTaskListObj.task}
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
    taskInput.value = '';
}
