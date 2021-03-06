import {editTaskMovement} from './index.js';
import {deleteTaskFunction} from './delete-tasks.js';
window.addEventListener("load", (event) => {

    let sum = document.querySelector('.sum');
    let addTaskInput = document.querySelector('.add-task-input');
    let addTaskForm = document.querySelector('.select-add-task-form');
    //NEED TO BUILD NEW TASK CONTAINER
    let orderedList = document.querySelector('.ordered-list');

    let originalPlaceholder = addTaskInput.placeholder

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
                // console.log(data.taskContent, 'data')
                console.log(data, 'data')

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

                editTaskMovement();

                let deleteTaskButtons = document.querySelectorAll('.delete-button');

                deleteTaskFunction(deleteTaskButtons);
                
                // UPDATE SUM
                sum.innerText=data.allTasksInCurrentList.length
            })
        }    
    })
});

