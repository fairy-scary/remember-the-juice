import {editTaskMovement} from './index.js';
import {deleteTaskFunction} from './delete-tasks.js';

// ADD TASKS USING AJAX, UPDATE DOM UPON DELETE
window.addEventListener("load", (event) => {

    let sum = document.querySelector('.sum');
    let addTaskForm = document.querySelector('.select-add-task-form');
    //NEED FOR NEW TASK CONTAINER
    let orderedList = document.querySelector('.ordered-list');

    
    if(addTaskForm){
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let taskContent = e.target.taskContent.value;
            let userListId = e.target.taskContent.id;

            if(!taskContent){
                document.querySelector('#create-task-error').style.display='';
            } else {
                document.querySelector('#create-task-error').style.display='none';

                fetch(`/tasks/create`, {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    taskContent,
                    userListId
                    })
                })
                .then(function(res) {
                    if (!res.ok) {
                        throw Error(res.statusText); // handle any potential server errors
                    }
                    return res.json();
                })
                .then(function(data) {
                
                    // CREATE NEW TASK CONTAINER ELEMENTS
                    let taskContainer = document.createElement('div');
                    let taskDiv = document.createElement('div');
                    let newTask = document.createElement('li');
                    let openEditButton = document.createElement('button');

                    let editButtonsDiv = document.createElement('div');
                    let deleteTaskButton = document.createElement('button');
                    let closeEditButtonsDiv = document.createElement('button');

                    // SET ALL ATTRIBUTES
                    taskContainer.setAttribute('class', 'task-container');
                    taskDiv.setAttribute('class', 'task-div');
                    taskDiv.setAttribute('id', userListId);
                    newTask.setAttribute('class', 'task');
                    openEditButton.setAttribute('class', 'saveButton open-edit');
                    openEditButton.setAttribute('type', 'submit');

                    editButtonsDiv.setAttribute('class', 'edit-buttons-div');
                    editButtonsDiv.style.display='none';
                    deleteTaskButton.setAttribute('class', 'saveButton delete-button');
                    closeEditButtonsDiv.setAttribute('class', 'saveButton close-edit-buttons-div');

                    // SET VALUES AND INNER TEXT
                    newTask.innerHTML = data.task.taskContent;
                    openEditButton.innerText= 'v';
                    deleteTaskButton.value=data.task.id;
                    deleteTaskButton.innerText= 'Delete';
                    closeEditButtonsDiv.innerText= '^';

                    // APPEND
                    orderedList.append(taskContainer);
                    taskContainer.append(taskDiv);
                    taskDiv.append(newTask);
                    taskDiv.append(openEditButton);

                    taskContainer.append(editButtonsDiv);
                    editButtonsDiv.append(deleteTaskButton);
                    editButtonsDiv.append(closeEditButtonsDiv);  

                    // ALLOWS NEWLY ADDED TASK EDIT DIV TO BE OPENED
                    editTaskMovement();

                    // ALLOWS NEWLY ADDED TASK TO BE DELETED
                    let deleteTaskButtons = document.querySelectorAll('.delete-button');
                    deleteTaskFunction(deleteTaskButtons);

                    // UPDATE SUM
                    sum.innerText=data.allTasksInCurrentList.length

                    // RESET INPUT FORM
                    addTaskForm.reset();
                })
            }    
        })
    }
});

