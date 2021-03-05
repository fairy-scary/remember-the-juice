window.addEventListener("load", (event) => {

    let deleteListLeftMenuButton = document.querySelector('#delete-list-button');
    let leftMenuLiValue = document.querySelector('.list-dropdown-items');
    let dropdownLi = document.querySelectorAll('.list-dropdown-items');
    let leftMenuLi = document.querySelectorAll('.li-left-menu');
    let sum = document.querySelector('.sum');
    let allTotalTasks = document.querySelectorAll('.tasks_incomplete');
    let tasksDivs = document.querySelectorAll('.task-div');
    let editTasksDivs = document.querySelectorAll('.edit-buttons-div');
    const selectLi = document.querySelector('.left-li-select');


    // SET VALUE HERE IN CASE USER DOESN'T CLICK ON SELECT AND JUST WANTS TO DELETE
    leftMenuLiValue = leftMenuLiValue.value

    selectLi.addEventListener('change', (event) => {
        leftMenuLiValue = event.target.value
    });


    // DELETE LISTS USING AJAX, UPDATE DOM UPON DELETE
    if(deleteListLeftMenuButton){
        deleteListLeftMenuButton.addEventListener('click', (e) => {
            e.preventDefault()
            
            fetch(`/lists/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                userListId: leftMenuLiValue
                })
            })
            .then(function(res) {
                if (!res.ok) {
                    throw Error(res.statusText); // handle any potential server errors
                }
                return res.json();
            })
            .then(function(data) {

                // DELETES LI FROM LEFT SIDE MENU, SETS SUM TOTAL TO 0, 
                leftMenuLi.forEach(li => {

                    let liValue = Number(leftMenuLiValue)

                    if (li.value === liValue){
                        li.remove();
                    }
                })

                // DELETES LI FROM DROPDOWN LIST
                dropdownLi.forEach(li => {

                    if (li.value === leftMenuLiValue){
                        li.remove();
                    }
                });

                // SETS TOTAL TASKS SUM TO 0 & DELETES ALL TASKS ON PAGE IF PAGE IS 
                // ON THE LIST THAT GOT DELETED, BUT IF ON 'ALL' PAGE, THEN SUBTRACTS 
                // NUM OF TASKS DELETED FROM TOTAL AND ONLY DELETE TASKS FROM LIST
                // THAT GOT DELETED
                allTotalTasks.forEach(totalTasks => {
                    if(!totalTasks.id){
                        sum.innerText-=data.tasks.length

                        for(let i=0; i<tasksDivs.length; i++){
                            if (tasksDivs[i].id === leftMenuLiValue){
                                tasksDivs[i].remove();
                                editTasksDivs[i].remove();
                            }
                        }
                    } else if (totalTasks.innerText === 'Total Tasks In '+data.list.listName){
                        sum.innerText = 0
                        
                        for(let i=0; i<tasksDivs.length; i++){
                            tasksDivs[i].remove();
                            editTasksDivs[i].remove();
                        }
                    }
                });
            })
            .catch(function(error) {
                console.log(error)
            });

        })
    };
});