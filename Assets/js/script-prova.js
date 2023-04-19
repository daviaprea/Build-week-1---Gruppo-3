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
            let answers = document.getElementById('answers');

            let optionsArr = []; //CREO ARRAY CON ARRAY DI OPZIONI
            let i=0;
            for(d of domande)
            {
                let text=`${d.correct_answer},${d.incorrect_answers.toString()}`;
                let textArr=text.split(",");
                optionsArr[i]=[...textArr];
                i++;
            }
            console.log(optionsArr);

            let btn = []; //CREO BOTTONI
            let cont=0;
            for (let i = 0; i < 4; i++)
            {
                btn[i]=document.createElement('button');
                btn[i].addEventListener("click", ()=>{
                    answers.innerHTML="";
                    cont++;
                    if(domande[cont].type == 'boolean')
                    {
                        answers.append(btn[0].innerHTML=optionsArr[cont][0]);
                        answers.append(btn[1].innerHTML=optionsArr[cont][1]);
                    }

                    else
                    {
                        answers.append(btn[0].innerHTML=optionsArr[cont][0]);
                        answers.append(btn[1].innerHTML=optionsArr[cont][1]);
                        answers.append(btn[2].innerHTML=optionsArr[cont][2]);
                        answers.append(btn[3].innerHTML=optionsArr[cont][3]);
                    }
                });
            }
            console.log(btn);

            if(domande[0].type == 'boolean')
            {
                let textnode = document.createTextNode(optionsArr[0][0]);
                btn[0].appendChild(textnode);
                answers.append(btn[0]);

                let textnode2 = document.createTextNode(optionsArr[0][1]);
                btn[1].appendChild(textnode2);
                answers.append(btn[1]);
            }

            else
            {
                let textnode = document.createTextNode(optionsArr[0][0]);
                btn[0].appendChild(textnode);
                answers.append(btn[0]);

                let textnode2 = document.createTextNode(optionsArr[0][1]);
                btn[1].appendChild(textnode2);
                answers.append(btn[1]);

                let textnode3 = document.createTextNode(optionsArr[0][2]);
                btn[2].appendChild(textnode3);
                answers.append(btn[2]);

                let textnode4 = document.createTextNode(optionsArr[0][3]);
                btn[3].appendChild(textnode4);
                answers.append(btn[3]);
            }
        });
    }
});