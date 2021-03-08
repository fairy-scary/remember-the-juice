
// PERMANENT DELETE TASKS USING AJAX, UPDATE DOM UPON DELETE
export const deleteTaskFunction = (deleteTaskButtons) => {
    if(deleteTaskButtons){
        deleteTaskButtons = document.querySelectorAll('.delete-button');
        let tasksDivs = document.querySelectorAll('.task-div');
        let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
      
       
        for (let i=0; i<deleteTaskButtons.length; i++){
            deleteTaskButtons[i].addEventListener('click', () => {
                let allTotalTasks = document.querySelector('.tasks_incomplete');
                let sum = document.querySelector('.sum');

                fetch(`/tasks/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    taskId: deleteTaskButtons[i].value,
                    // THERE IS NO ALLTOTALTASKS.ID IF ON ALL-HOME PAGE
                    userListId: allTotalTasks.id
                    })
                })
                .then(function(res) {
                    if (!res.ok) {
                        throw Error(res.statusText); // handle any potential server errors
                    }
                    return res.json();
                })
                .then(function(data) {
                    // IF THERE IS A CURRENT LIST ID, THEN SET SUM TO ALL TASKS IN THAT LIST.LENGTH
                    // IF NOT (ON 'ALL-HOME PAGE'), THEN JUST SUBTRACT
                    if(Number(allTotalTasks.id) === data.task.userListId){
                        sum.innerText = data.allTasksInCurrentList.length;
                    } else if (!allTotalTasks.id){
                        sum.innerText--;
                    }
                    
                    tasksDivs[i].remove();
                    editTasksDivs[i].remove();
                
                })
                .catch(function(error) {
                    console.log(error)
                });
            })
        };
    };
};



// PERMANENT DELETE ALL ITEMS IN TRASH USING AJAX, UPDATE DOM UPON DELETE
export const deleteAllFunction = (deleteAllButton) => {
    if(deleteAllButton){
        let tasksDivs = document.querySelectorAll('.task-div');
        let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
      
        
        deleteAllButton.addEventListener('click', () => {
            let allTotalTasks = document.querySelector('.tasks_incomplete');
            let sum = document.querySelector('.sum');

            fetch(`/lists/trash/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    userListId: deleteAllButton.id
                    })
                })
                .then(function(res) {
                    if (!res.ok) {
                        throw Error(res.statusText); // handle any potential server errors
                    }
                    return res.json();
                })
                .then(function(data) {
                    sum.innerText = 0;
                    
                    tasksDivs.forEach(taskDiv => {
                        taskDiv.remove();
                    })

                    editTasksDivs.forEach(editTaskDiv => {
                        editTaskDiv.remove();
                    })
                })
                .catch(function(error) {
                    console.log(error)
                });
            })
    };
};

window.addEventListener("load", (event) => {
    let deleteTaskButtons = document.querySelectorAll('.delete-button');
    let deleteAllButton = document.querySelector('.delete-all-button');

    deleteTaskFunction(deleteTaskButtons);
    deleteAllFunction(deleteAllButton);

});