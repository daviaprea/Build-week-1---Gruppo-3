let wpTemplate = document.getElementById('welcome-page').content;
let wpHTML = document.importNode(wpTemplate, true);
let mainBox = document.getElementById('content')

// aggiungo template welcome page

mainBox.appendChild(wpHTML);

let proceedBtn = document.getElementById('proceed')
let check = document.getElementById ('check');

let bpTemplate = document.getElementById('bp-template').content;
let bpHTML = document.importNode(bpTemplate, true);

// aggiungo template benchmark page

proceedBtn.addEventListener('click', () => {
    if(check.checked == true) {
        mainBox.innerHTML = '';
        mainBox.appendChild(bpHTML);
    }
})











