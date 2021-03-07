// MOVE TASKS TO TRASH AND DELETE FROM CURRENT LIST USING AJAX, UPDATE DOM UPON DELETE
export const moveTaskToTrashFunction = (moveToTrashButtons) => {
    if(moveToTrashButtons){
        moveToTrashButtons = document.querySelectorAll('.move-to-trash-button');
        let tasksDivs = document.querySelectorAll('.task-div');
        let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
      
       
        for (let i=0; i<moveToTrashButtons.length; i++){
            moveToTrashButtons[i].addEventListener('click', () => {
                let allTotalTasks = document.querySelector('.tasks_incomplete');
                let sum = document.querySelector('.sum');

                fetch(`/tasks/trash`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    taskId: moveToTrashButtons[i].value,
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

window.addEventListener("load", (event) => {
    let moveToTrashButtons = document.querySelectorAll('.move-to-trash-button');

    moveTaskToTrashFunction(moveToTrashButtons);

});