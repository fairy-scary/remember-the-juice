window.addEventListener("load", (event) => {
    
       let cssRef = document.getElementById("flavor")
       let logo = document.getElementById("logo")
       let apple = document.getElementById("apple");
       let lemon = document.getElementById("lemon");
       let orange = document.getElementById("orange");
       let grape = document.getElementById("grape");
       let strawberry = document.getElementById("strawberry");
    //    let editButtons = document.querySelectorAll('.edit');
    //    let taskList = document.getElementById('task-list');
    //    let testButtons = document.querySelectorAll('.test');

    //    testButtons.forEach(testButton => {
    //             testButton.style.visibility = 'hidden'
    //     })
       
    //    console.log(taskList)
    //    for (let i=0; i<editButtons.length; i++){
    //        let button = editButtons[i];
    //        button.addEventListener('click', () => {
    //            let testButton = testButtons[i];
    //            testButton.style.visibility = 'visible'
    //        })
    //    }
    //    editButtons.forEach(button => {
    //         button.addEventListener("click", () => {
    //         // let myNewListItem = document.createElement('li');
    //         // myNewListItem.innerHTML='hey';
    //         // taskList.appendChild(myNewListItem);

    //         testButtons.forEach(testButton => {
    //             testButton.style.visibility = 'hidden'
    //         })
        
    //         });
    //    })

   
    apple.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/apple.css')
        logo.setAttribute("src", "../images/apple-logo.png")
    });

    lemon.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/lemon.css')
        logo.setAttribute("src", "../images/lemon-logo.png")
    });

    orange.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/orange.css')
        logo.setAttribute("src", "../images/orange-logo.png")
    });

    grape.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/grape.css')
        logo.setAttribute("src", "../images/grape-logo.png")
    });

    strawberry.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/strawberry.css')
        logo.setAttribute("src", "../images/default-logo.png")
    });

    // editButton.addEventListener("click", () => {
    //     let myNewListItem = document.createElement('li');
    //     myNewListItem.innerHTML='hey';
    //     taskList.appendChild(myNewListItem);
        
    // });

});