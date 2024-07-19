
let tasksList = JSON.parse(localStorage.getItem(`tasksList`)) || [];
let allPriority = JSON.parse(localStorage.getItem(`allPriority`)) || [];
const tasks = JSON.parse(localStorage.getItem(`tasks`)) || {
    prints: [],
    glueBlock: [],
    ploter: [],
    engineers: [],
    urgent: [],
    others: []
};


// we use this instead of calling to all functions because the js loaded faster then the DOM Elements.
//The DOMContentLoaded event ensures that JavaScript code runs only 
//after the entire HTML document has been loaded and parsed.

//Two actions: load the DOM, run JavaScript in it.

document.addEventListener('DOMContentLoaded', () => {
    renderHTML();
    renderAllTasks();
    renderAllPriorities();
    updateCategoryNotes(); //UpdateCategoryNotes or directly call categoryNote for each category here
});

const noteElement = document.querySelector(`.button-container div`);

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
    noteElement.classList.add(`button-container-show`);
    if (taskInput.value) {
        const newTask = {
            task: taskInput.value,
            category: category,
            timestamp: new Date().getTime(),
            taskId: String((Math.random().toFixed(3)) * 1000)
        };
        tasks[category].unshift({task: newTask.task, id: newTask.taskId});  // Add to the specific category array
        tasksList.unshift(newTask);  // Add to the overall list with timestamp
        renderHTML();
	categoryNote(category);
	saveToStorageTasks(tasks);
    saveToStorage(tasksList);
    }
}


function renderHTML() {
    let html = '';

    // Sort tasksList by timestamp in descending order
    const sortedTasks = tasksList.sort((a, b) => b.timestamp - a.timestamp);

    sortedTasks.forEach(newTaskListObj => {
        html += `
<div class="todo todo-${newTaskListObj.taskId}">
    <div class="left-part">
        <input type="checkbox" class="checkbox" data-task-id="${newTaskListObj.taskId}">
        <div class="todo-${newTaskListObj.category}">
            ${newTaskListObj.task}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit" data-task-id="${newTaskListObj.taskId}">Edit</button>
        <button class="button-priority" data-task-id="${newTaskListObj.taskId}">Priority</button>
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
    <div class="todo todo-${element.id}">
    <div class="left-part">
        <input type="checkbox" class="checkbox" data-task-id="${element.id}">
        <div class="todo-${arrayButtonClass}">
            ${element.task}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit" data-task-id="${element.id}">Edit</button>
        <button class="button-priority" data-task-id="${element.id}">Priority</button>
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
            <div class="todo todo-${priority.taskId}">
    <div class="left-part">
        <input type="checkbox" class="checkbox" data-task-id="${priority.taskId}">
        <div class="todo-${priority.category}">
            ${priority.task}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit" data-task-id="${priority.taskId}">Edit</button>
        <button class="button-priority" data-task-id="${priority.taskId}">Priority</button>
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
            const priorityId = button.dataset.taskId;
		
	//const priorityButtonClass = document.querySelector(`.todo-${priorityId}`);
	//priorityButtonClass.classList.add(`todo-priority-hide`);
	
		
		
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
		
		button.classList.add(`button-clicked`);
	
		allPriority = allPriority.filter((task) => task.taskId !== priorityId);
                saveToStoragePriority(allPriority);
                renderAllPriorities();

		


                console.log(`Task with id ${priorityId} is already a priority`);
            }
            saveToStoragePriority(allPriority);
            updateCategoryNotes();
		
            
        });
    });


       document.querySelectorAll(`.checkbox`).forEach((checkbox) => {
    checkbox.addEventListener(`click`, () => {
        const checkBoxId = checkbox.dataset.taskId;
        
        tasksList = tasksList.filter(task => task.taskId !== checkBoxId);
        allPriority = allPriority.filter(priority => priority.taskId !== checkBoxId);

        // Remove task from tasks object categories
        for (const category in tasks) {
            if (tasks.hasOwnProperty(category)) {
                tasks[category] = tasks[category].filter(task => task.id !== checkBoxId);
            }
        }

        saveToStorage(tasksList);
        saveToStoragePriority(allPriority);
        saveToStorageTasks(tasks);

        // Re-render the updated lists
        renderHTML();
        updateCategoryNotes();
        renderAllTasks();
        renderAllPriorities();
        });
        });
        }

function categoryNote(category) {
    const categoryNum = tasks[category].length;
    document.querySelector(`.${category}`).innerHTML = categoryNum;
}

function updateCategoryNotes() {
    const categories = ['prints', 'glueBlock', 'ploter', 'engineers', 'urgent', 'others'];
    categories.forEach(category => {
        categoryNote(category);
    });
}

function saveToStorage(tasksList) {
localStorage.setItem(`tasksList`, JSON.stringify(tasksList));
}

function saveToStoragePriority(allPriority) {
    localStorage.setItem(`allPriority`, JSON.stringify(allPriority));
    }

function saveToStorageTasks(tasks) {
     localStorage.setItem(`tasks`, JSON.stringify(tasks));
    }
