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
    urgentButton: document.querySelector(`.urgent-units-sort`),
};


buttons.addButton.addEventListener('click', () => {
    addTaskToCategory('others');
    renderNotifications();
});

buttons.printsButton.addEventListener('click', () => {
    addTaskToCategory('prints');
    renderNotifications();
});

buttons.glueBlockButton.addEventListener('click', () => {
    addTaskToCategory('glueBlock');
    renderNotifications();
});

buttons.ploterButton.addEventListener('click', () => {
    addTaskToCategory('ploter');
    renderNotifications();
});

buttons.engineersButton.addEventListener('click', () => {
    addTaskToCategory('engineers');
    renderNotifications();
});

buttons.urgentButton.addEventListener('click', () => {
    addTaskToCategory('urgent');
    renderNotifications();
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
            ${element}
        </div>
    </div>
    <div class="right-part">
        <button class="button-edit">Edit</button>
        <button class="button-priority">Priority</button>
    </div>
</div>
    `;
	});

	if (tasks[arrayButtonClass].length > 0) {
    	document.querySelector(`.todo-list-container`).innerHTML = categoryHTML;
	console.log(arrayButtonClass);
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
        topPriorities: document.querySelector(`.js-top-priorities`)
    }

    infoHeader.allTasks.addEventListener(`click`, () => {
        document.querySelector(`.todo-list-container`).innerHTML = renderHTML();
    });
    

    function renderNotifications() {

        let countAllTask = 0;

        tasksList.forEach((task) => {
            countAllTask += 1;
        });
        
        infoHeader.allTasksNum.innerHTML = countAllTask;
    }
