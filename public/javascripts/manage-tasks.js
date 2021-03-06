import {editTaskMovement} from './index.js';
import {deleteTaskFunction} from './delete-tasks.js';
window.addEventListener("load", (event) => {

    // let deleteTaskButtons = document.querySelectorAll('.delete-button');
    // let tasksDivs = document.querySelectorAll('.task-div');
    // let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
    // let allTotalTasks = document.querySelector('.tasks_incomplete');
    // let sum = document.querySelector('.sum');

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
                console.log(data.taskContent, 'data')
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
                taskDiv.setAttribute('id', data.userListId);
                newTask.setAttribute('class', 'task');
                openEditButton.setAttribute('class', 'saveButton open-edit');
                openEditButton.setAttribute('type', 'submit');

                editButtonsDiv.setAttribute('class', 'edit-buttons-div');
                editButtonsDiv.style.display='none';
                deleteTaskButton.setAttribute('class', 'saveButton delete-button');
                closeEditButtonsDiv.setAttribute('class', 'saveButton close-edit-buttons-div');

                // SET VALUES AND INNER TEXT
                newTask.innerHTML = data.taskContent;
                openEditButton.innerText= 'v';
                deleteTaskButton.value=data.id;
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

            })
        }    
    })




    // // DELETE TASKS USING AJAX, UPDATE DOM UPON DELETE
    // if(deleteTaskButtons){
    //     console.log(deleteTaskButtons)
    //     for (let i=0; i<deleteTaskButtons.length; i++){
    //         deleteTaskButtons[i].addEventListener('click', () => {

    //         fetch(`/tasks/delete`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //             taskId: deleteTaskButtons[i].value
    //             })
    //         })
    //         .then(function(res) {
    //             if (!res.ok) {
    //                 throw Error(res.statusText); // handle any potential server errors
    //             }
    //             return res.json();
    //         })
    //         .then(function(data) {
    //             // tasks[i].remove();
    //             if(allTotalTasks.id === data.userListId || !allTotalTasks.id){
    //                 sum.innerText-=1
    //             }
                
    //             tasksDivs[i].remove();
    //             editTasksDivs[i].remove();
              
    //         })
    //         .catch(function(error) {
    //             console.log(error)
    //         });
    //     })};
    // };
});

