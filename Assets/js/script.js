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
        fetch('https://opentdb.com/api.php?amount=10&category=18')
        .then(res => res.json())
        .then(res => {            
            domande = res.results;
            console.log(domande)
            mainBox.appendChild(bpHTML);
            
            let question = document.querySelector('#question');
            let answers = document.querySelector('.answers');
            let optionsArr = [];

            for(let q = 0 ; q < domande.length; q++){
                optionsArr.push(domande[q].correct_answer);               
            }

            console.log(optionsArr);


            let btn = [];
            for (let i = 0; i < 4; i++) btn.push(document.createElement('button'));

            domande.forEach(el => {
                if(el.type == 'boolean') {

                    answers.appendChild(btn[0]);
                    answers.appendChild(btn[1]);
                }
            })
        })
        
    }
})











