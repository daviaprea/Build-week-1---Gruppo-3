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
            let cont=0;
            for(d of domande) //GENERO L'ARRAY E PIAZZO I BOTTONI
            {
                let text=`${d.correct_answer},${d.incorrect_answers.toString()}`;
                let textArr=text.split(",");
                optionsArr[cont]=[...textArr];
                cont++;

                if(d.type == 'boolean')
                {
                    answers.append(btn[0].innerHTML=optionsArr[0]);
                    answers.append(btn[1].innerHTML=optionsArr[1]);
                }

                else
                {
                    answers.append(btn[0].innerHTML=optionsArr[0]);
                    answers.append(btn[1].innerHTML=optionsArr[1]);
                    answers.append(btn[2].innerHTML=optionsArr[2]);
                    answers.append(btn[3].innerHTML=optionsArr[3]);
                }
            }
            console.log(optionsArr);
        })
        
    }
});











