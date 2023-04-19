let wpTemplate = document.getElementById('welcome-page').content;
let wpHTML = document.importNode(wpTemplate, true);
let content = document.getElementById('content')
 
window.addEventListener('load', () => {
    content.appendChild(wpHTML);
})

let proceedBtn = document.getElementById('proceed')
let check = document.getElementById ('check');

proceedBtn.addEventListener('click', () => {
    console.log(proceedBtn)
})