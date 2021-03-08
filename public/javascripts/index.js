import {themeInit, themeInit2} from './theme.js';
export const editTaskMovement = () => {
        let tasks = document.querySelectorAll('.task');
        let openEditButtons = document.querySelectorAll('.open-edit');
        let editButtonsDivs = document.querySelectorAll('.edit-buttons-div');
        let closeEditButtonsDivs = document.querySelectorAll('.close-edit-buttons-div');

        // LOOP THROUGH TASKS AND SET CORRESPONDING EDIT BUTTON TO MAKE EDIT
        // BUTTONS DIV VISIBLE UPON CLICK OF EDIT BUTTON, AND INVISIBLE UPON
        // CLICK OF CLOSE EDIT BUTTON
       
        for (let i=0; i<tasks.length; i++){
            openEditButtons[i].addEventListener('click', () => {
                editButtonsDivs[i].style.display = '';
                openEditButtons[i].style.display = 'none';
            });

            closeEditButtonsDivs[i].addEventListener('click', () => {
                editButtonsDivs[i].style.display = 'none';
                openEditButtons[i].style.display = '';
            });
        }
};


window.addEventListener("load", (event) => {
    // themeInit();
    
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

    // SET DEMO USER CREDENTIALS WHEN DEMO BUTTON IS CLICKED
    if(demoLoginButton){
    demoLoginButton.addEventListener('click', () => {
        usernameField.value = 'demo';
        passwordField.value = 'password';
    })};

   
    if(apple){
    apple.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/apple.css')
        logo.setAttribute("src", "../images/apple-logo.png")
        localStorage.clear();
        localStorage.setItem('fruit', 'apple');
        themeInit()
        themeInit2()
        // localStorage.setItem('logo', 'apple');
    });

    lemon.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/lemon.css')
        logo.setAttribute("src", "../images/lemon-logo.png")
        localStorage.clear();
        localStorage.setItem('fruit', 'lemon');
        themeInit()
        themeInit2()
        // localStorage.setItem('logo', 'lemon');
    });

    orange.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/orange.css')
        logo.setAttribute("src", "../images/orange-logo.png")
        localStorage.clear();
        localStorage.setItem('fruit', 'orange');
        themeInit()
        themeInit2()
        // localStorage.setItem('logo', 'orange');
    });

    grape.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/grape.css')
        logo.setAttribute("src", "../images/grape-logo.png")
        localStorage.clear();
        localStorage.setItem('fruit', 'grape');
        themeInit()
        themeInit2()
        // localStorage.setItem('logo', 'grape');
    });

    strawberry.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/strawberry.css')
        logo.setAttribute("src", "../images/strawberry-logo.png")
        localStorage.clear();
        localStorage.setItem('fruit', 'strawberry');
        themeInit()
        themeInit2()
        // localStorage.setItem('logo', 'strawberry');
    });
}


    editTaskMovement();

});