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

            mainBox.appendChild(bpHTML);
            
            let question = document.querySelector('#question');
            let answers = document.querySelector('.answers');

            let btn = []; //CREO BOTTONI
            for (let i = 0; i < 4; i++)
            {
                btn.push(document.createElement('button'));
                btn[i].addEventListener("click", ()=>{
                    answers.innerHTML="";
                });
            }

            let optionsArr = []; //CREO ARRAY CON ARRAY DI OPZIONI
            let cont = 0;

            
            while(cont < domande.length){
                let text=`${domande[cont].correct_answer},${domande[cont].incorrect_answers.toString()}`;
                let textArr=text.split(",");
                optionsArr[cont]=[...textArr];

                function checkAnswer(){
                   answers.innerHTML= "" 
                }

                if (optionsArr[cont].length == 2){
                    answers.append(btn[0].addEventListener("click", checkAnswer));
                    answers.append(btn[1].addEventListener("click", checkAnswer));
                    
                }else{
                    answers.append(btn[0].addEventListener("click", checkAnswer));
                    answers.append(btn[1].addEventListener("click", checkAnswer));
                    answers.append(btn[2].addEventListener("click", checkAnswer));
                    answers.append(btn[3].addEventListener("click", checkAnswer));
                    
                }

                cont++;

                console.log(optionsArr[cont]);
                
            }

            
        })
        
    }
});











