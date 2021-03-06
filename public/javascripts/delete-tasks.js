
    // DELETE TASKS USING AJAX, UPDATE DOM UPON DELETE
export const deleteTaskFunction = (deleteTaskButtons) => {
    if(deleteTaskButtons){
        deleteTaskButtons = document.querySelectorAll('.delete-button');
        let tasksDivs = document.querySelectorAll('.task-div');
        let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
        let allTotalTasks = document.querySelector('.tasks_incomplete');
        let sum = document.querySelector('.sum');
        console.log(deleteTaskButtons)
        for (let i=0; i<deleteTaskButtons.length; i++){
            deleteTaskButtons[i].addEventListener('click', () => {

            fetch(`/tasks/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                taskId: deleteTaskButtons[i].value
                })
            })
            .then(function(res) {
                if (!res.ok) {
                    throw Error(res.statusText); // handle any potential server errors
                }
                return res.json();
            })
            .then(function(data) {
                // tasks[i].remove();
                if(allTotalTasks.id === data.userListId || !allTotalTasks.id){
                    sum.innerText-=1
                }
                
                tasksDivs[i].remove();
                editTasksDivs[i].remove();
              
            })
            .catch(function(error) {
                console.log(error)
            });
        })};
    };
};

window.addEventListener("load", (event) => {
    let deleteTaskButtons = document.querySelectorAll('.delete-button');

    deleteTaskFunction(deleteTaskButtons);

});