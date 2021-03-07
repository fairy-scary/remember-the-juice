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


// const themeInit = () => {
//     let linkRel = document.getElementById('flavor');
//     let logo = document.getElementById("logo")
//     // linkRel.setAttribute('id', 'flavor');
//     // linkRel.setAttribute('rel', 'stylesheet');
    
//     if(linkRel){

//     if (localStorage.getItem('color') === 'green') {
//         linkRel.setAttribute('href', '/stylesheets/apple.css')
//         logo.setAttribute("src", "../images/apple-logo.png")
//     } else if (localStorage.getItem('color') === 'yellow') {
//         linkRel.setAttribute('href', '/stylesheets/lemon.css')
//         logo.setAttribute("src", "../images/lemon-logo.png")
//     } else if (localStorage.getItem('color') === 'orange') {
//         linkRel.setAttribute('href', '/stylesheets/orange.css')
//         logo.setAttribute("src", "../images/orange-logo.png")
//     } else if (localStorage.getItem('color') === 'grape') {
//         linkRel.setAttribute('href', '/stylesheets/grape.css')
//         logo.setAttribute("src", "../images/grape-logo.png")
//     } else if (localStorage.getItem('color') === 'strawberry') {
//         linkRel.setAttribute('href', '/stylesheets/strawberry.css')
//         logo.setAttribute("src", "../images/default-logo.png")
//     } else {
//         linkRel.setAttribute('href', '/stylesheets/strawberry.css')
//         logo.setAttribute("src", "../images/default-logo.png")
//     }

//     let head = document.head;
//     head.append(linkRel);
//     }

// }

// themeInit();


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

   
    
    apple.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/apple.css')
        logo.setAttribute("src", "../images/apple-logo.png")
        // localStorage.clear();
        // localStorage.setItem('color', 'green');
        // localStorage.setItem('logo', 'apple');
    });

    lemon.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/lemon.css')
        logo.setAttribute("src", "../images/lemon-logo.png")
        // localStorage.clear();
        // localStorage.setItem('color', 'yellow');
        // localStorage.setItem('logo', 'lemon');
    });

    orange.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/orange.css')
        logo.setAttribute("src", "../images/orange-logo.png")
        // localStorage.clear();
        // localStorage.setItem('color', 'orange');
        // localStorage.setItem('logo', 'orange');
    });

    grape.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/grape.css')
        logo.setAttribute("src", "../images/grape-logo.png")
        // localStorage.clear();
        // localStorage.setItem('color', 'grape');
        // localStorage.setItem('logo', 'grape');
    });

    strawberry.addEventListener("click", () => {
        cssRef.setAttribute('href', '/stylesheets/strawberry.css')
        logo.setAttribute("src", "../images/default-logo.png")
        // localStorage.clear();
        // localStorage.setItem('color', 'strawberry');
        // localStorage.setItem('logo', 'strawberry');
    });


    editTaskMovement();

});