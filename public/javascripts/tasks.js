window.addEventListener("load", (event) => {

    let deleteTaskButtons = document.querySelectorAll('.delete-button');
    let tasksDivs = document.querySelectorAll('.task-div');
    let editTasksDivs = document.querySelectorAll('.edit-buttons-div');



    // DELETE TASKS USING AJAX, UPDATE DOM UPON DELETE
    if(deleteTaskButtons){
        console.log(deleteTaskButtons)
        for (let i=0; i<deleteTaskButtons.length; i++){
            deleteTaskButtons[i].addEventListener('click', () => {

            fetch(`tasks/test/${deleteTaskButtons[i].value}`, {
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
                // console.log(data)
                // tasks[i].remove();
                tasksDivs[i].remove();
                editTasksDivs[i].remove();
              
            })
            .catch(function(error) {
                console.log(error)
            });
        })};
    };
});

