const tasksList = JSON.parse(localStorage.getItem(`tasksList`)) || [];
const allPriority = JSON.parse(localStorage.getItem(`allPriority`)) || [];

// active all the functions while the arrays are full from the JSON.
document.addEventListener('DOMContentLoaded', () => {
    renderHTML();
    renderAllTasks();
    renderAllPriorities();
    
});

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
    renderAllTasks();
});

buttons.printsButton.addEventListener('click', () => {
    addTaskToCategory('prints');
    renderAllTasks();
});

buttons.glueBlockButton.addEventListener('click', () => {
    addTaskToCategory('glueBlock');
    renderAllTasks();
});

buttons.ploterButton.addEventListener('click', () => {
    addTaskToCategory('ploter');
    renderAllTasks();
});

buttons.engineersButton.addEventListener('click', () => {
    addTaskToCategory('engineers');
    renderAllTasks();
});

buttons.urgentButton.addEventListener('click', () => {
    addTaskToCategory('urgent');
    renderAllTasks();
});


function addTaskToCategory(category) {
    if (taskInput.value) {
        const newTask = {
            task: taskInput.value,
            category: category,
            timestamp: new Date().getTime(),
            taskId: Math.random().toFixed(3)
        };
        tasks[category].unshift({task: newTask.task, id: newTask.taskId});  // Add to the specific category array
        tasksList.unshift(newTask);  // Add to the overall list with timestamp
        renderHTML();
	categoryNote(category);
	saveToStorage(tasksList);
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
        <button class="button-edit" data-edit-id="${newTaskListObj.taskId}">Edit</button>
        <button class="button-priority" data-priority-id="${newTaskListObj.taskId}">Priority</button>
    </div>
</div>
        `;
    });

    document.querySelector(`.todo-list-container`).innerHTML = html;
    taskInput.value = '';
    activeButtons();
    return html;
}


//side bar part

const sideBarButtons = {
	printSidebar: document.querySelector(`.js-print`),
	glueBlockSideBar: document.querySelector(`.js-glue-block`),
	ploterSideBar: document.querySelector(`.js-ploter`),
	engineersSideBar: document.querySelector(`.js-engineers`),
	urgentUnits: document.querySelector(`.js-urgent-units`),
	others: document.querySelector(`.js-others`)
	}

    sideBarButtons.printSidebar.addEventListener(`click`, () => {
    categoryButtons(`prints`);
    });

    sideBarButtons.glueBlockSideBar.addEventListener(`click`, () => {
    categoryButtons(`glueBlock`);
    });

    sideBarButtons.ploterSideBar.addEventListener(`click`, () => {
    categoryButtons(`ploter`);
    });
    
    sideBarButtons.engineersSideBar.addEventListener(`click`, () => {   
    categoryButtons(`engineers`);
    });
   
    sideBarButtons.urgentUnits.addEventListener(`click`, () => {
    categoryButtons(`urgent`);
    });
    
    sideBarButtons.others.addEventListener(`click`, () => {
    categoryButtons(`others`);
    });
        

	function categoryButtons(arrayButtonClass) {
        let categoryHTML = ``;

	tasks[arrayButtonClass].forEach((element) => {
	categoryHTML += `
    <div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-${arrayButtonClass}">
            ${element.task}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit" data-edit-id="${element.id}">Edit</button>
        <button class="button-priority" data-priority-id="${element.id}">Priority</button>
    </div>
</div>
    `;
	});

	if (tasks[arrayButtonClass].length > 0) {

        document.querySelector(`.todo-list-container`).innerHTML = categoryHTML;
        activeButtons();
	} else {
	document.querySelector(`.todo-list-container`).innerHTML = `
 	<div class="no-tasks"> No Tasks </div>
	`;
	}

	}

    const infoHeader = {
        allTasks: document.querySelector(`.js-all-tasks`),
        allTasksNote: document.querySelector(`.all-tasks-note`),
        allTasksNum: document.querySelector(`.all-tasks-note .top-number`),
        topPriorities: document.querySelector(`.js-top-priorities`),
	topPrioritiesNum: document.querySelector(`.js-top-priorities .top-number`)
    }

    infoHeader.allTasks.addEventListener(`click`, () => {
        document.querySelector(`.todo-list-container`).innerHTML = renderHTML();
        activeButtons();
    });
//new part
    infoHeader.topPriorities.addEventListener(`click`, () => {
        
        let topPrioritiesHTML = ``;

        allPriority.forEach((priority) => {
            topPrioritiesHTML += `
            <div class="todo">
    <div class="left-part">
        <input type="checkbox">
        <div class="todo-${priority.category}">
            ${priority.task}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit" data-edit-id="${priority.taskId}">Edit</button>
        <button class="button-priority" data-priority-id="${priority.taskId}">Priority</button>
    </div>
</div>
`
        });

        document.querySelector(`.todo-list-container`).innerHTML = topPrioritiesHTML;
        saveToStoragePriority(allPriority);
        activeButtons();
    });
    

    function renderAllTasks() {

        let countAllTask = 0;

        tasksList.forEach((task) => {
            countAllTask += 1;
        });
        
        infoHeader.allTasksNum.innerHTML = countAllTask;
    }

    function renderAllPriorities() {

        let countAllPriorities = 0;

        allPriority.forEach((priority) => {
            countAllPriorities += 1;
        });
        
        infoHeader.topPrioritiesNum.innerHTML = countAllPriorities;
    }

function activeButtons() {
    document.querySelectorAll(`.button-priority`).forEach((button) => {
        button.addEventListener(`click`, () => {
            const priorityId = button.dataset.priorityId;

            // Check if the task is already in the allPriority array 
            const isAlreadyPriority = allPriority.some((task) => task.taskId === priorityId);

            if (!isAlreadyPriority) {
                tasksList.forEach((task) => {
                    if (task.taskId === priorityId) {
                        allPriority.unshift(task);
                        console.log(`task pushed`);
                        renderAllPriorities();
                        saveToStoragePriority(allPriority);
                    }
                });
            } else {
                console.log(`Task with id ${priorityId} is already a priority`);
            }
        });
    });
}

function categoryNote(category) {

const categoryNum = tasks[category].length;
document.querySelector(`.${category}`).innerHTML = categoryNum;
}

function saveToStorage(tasksList) {
localStorage.setItem(`tasksList`, JSON.stringify(tasksList));
}

function saveToStoragePriority(allPriority) {
    localStorage.setItem(`allPriority`, JSON.stringify(allPriority));
    }

    function saveToStorageCategoryNum(categoryNum) {
        localStorage.setItem(`categoryNum`, JSON.stringify(categoryNum));
        }
