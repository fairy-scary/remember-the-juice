window.addEventListener("load", (event) => {
    let demoLoginButton = document.getElementById('demo-button');
    let usernameField = document.getElementById('username-field');
    let passwordField = document.getElementById('password-field');
    
    let cssRef = document.getElementById("flavor")
    let logo = document.getElementById("logo")
    let apple = document.getElementById("apple");
    let lemon = document.getElementById("lemon");
    let orange = document.getElementById("orange");
    let grape = document.getElementById("grape");
    let strawberry = document.getElementById("strawberry");
    
    let tasks = document.querySelectorAll('.task');
    let openEditButtons = document.querySelectorAll('.open-edit');
    let editButtonsDivs = document.querySelectorAll('.edit-buttons-div');
    let closeEditButtonsDivs = document.querySelectorAll('.close-edit-buttons-div');


    // SET DEMO USER CREDENTIALS WHEN DEMO BUTTON IS CLICKED
    demoLoginButton.addEventListener('click', () => {
        usernameField.value = 'demo';
        passwordField.value = 'password';
    });

    //    SET THE EDIT BUTTON DIVS TO INVISIBLE
    editButtonsDivs.forEach(editButtonsDiv => {
            editButtonsDiv.style.display = 'none'
    });

    // LOOP THROUGH TASKS AND SET CORRESPONDING EDIT BUTTON TO MAKE EDIT
    // BUTTONS DIV VISIBLE UPON CLICK OF EDIT BUTTON, AND INVISIBLE UPON
    // CLICK OF CLOSE EDIT BUTTON
       
    for (let i=0; i<tasks.length; i++){
        openEditButtons[i].addEventListener('click', () => {
            editButtonsDivs[i].style.display = ''
        });

        closeEditButtonsDivs[i].addEventListener('click', () => {
            editButtonsDivs[i].style.display = 'none'
        });
    }
 

   
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

});