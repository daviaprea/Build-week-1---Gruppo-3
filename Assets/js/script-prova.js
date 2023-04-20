let wpTemplate = document.getElementById('welcome-page').content;
let wpHTML = document.importNode(wpTemplate, true);

let mainBox = document.getElementById('content');
let headBox = document.getElementById('content-h');


// aggiungo template welcome page

mainBox.appendChild(wpHTML);

let proceedBtn = document.getElementById('proceed');
let check = document.getElementById ('check');

let bpTemplate = document.getElementById('bp-template').content;
let bpHTML = document.importNode(bpTemplate, true);

let bpTimer = document.getElementById('bp-timer').content;
let bpTimerHTML = document.importNode(bpTimer, true);

// aggiungo template benchmark page

proceedBtn.addEventListener('click', () => {
    if(check.checked == true) {
        mainBox.innerHTML = '';
        fetch('https://opentdb.com/api.php?amount=10&category=18')
        .then(res => res.json())
        .then(res => {            
            domande = res.results;

            mainBox.appendChild(bpHTML);
            headBox.appendChild(bpTimerHTML);
            
            let qstTitle = document.getElementById('question');
            let answers = document.getElementById('answers');
            let qstCont=document.getElementById('q-number');

            console.log(domande);

            let optionsArr = []; //CREO ARRAY CON ARRAY DI OPZIONI
            let i=0;
            for(d of domande)
            {
                let text=`${d.correct_answer},${d.incorrect_answers.toString()}`;
                let textArr=text.split(",");
                let shuffledArray = textArr.sort((a, b) => 0.5 - Math.random());
                optionsArr[i]=[...shuffledArray];
                i++;
            }
            console.log(optionsArr);

            let btn = []; //CREO BOTTONI
            let cont=0;
            let correct=0;
            let wrong=0;

            for (let i = 0; i < 4; i++)
            {
                btn[i]=document.createElement('button');
                btn[i].addEventListener("click", ()=>{
                    btn[i].innerHTML==domande[cont].correct_answer ? correct++ : wrong++;
                    btnHandler();
                });
            }

            if(domande[0].type == 'boolean')
            {
                for(let i=0; i<2; i++)
                {
                    let textnode = document.createTextNode(optionsArr[0][i]);
                    btn[i].appendChild(textnode);
                    answers.append(btn[i]);

                    qstTitle.innerHTML=domande[0].question;
                }
                qstCont.innerHTML=1;
            }

            else
            {
                for(let i=0; i<4; i++)
                {
                    let textnode = document.createTextNode(optionsArr[0][i]);
                    btn[i].appendChild(textnode);
                    answers.append(btn[i]);
                    
                    qstTitle.innerHTML=domande[0].question;
                }
                qstCont.innerHTML=1;
            }

            //SETTAGGIO TIMER
            let progValue = document.getElementById("seconds");
            progValue.innerHTML = 20;
            progBar = Number(progValue.innerHTML);

            let prog = setInterval(() => {

                progValue.innerHTML = Number(progValue.innerHTML) - 1;

                if(progValue.innerHTML == "0") btnHandler(false);

            }, 1000);

            function btnHandler(b=true)
            {
                cont++;
                if(cont<optionsArr.length)
                {
                    if (b == false)
                    {
                        wrong++;
                        b = true;
                        progValue.innerHTML = 20;
                    }

                    answers.innerHTML = "";
                    qstCont.innerHTML = cont + 1;
                    console.log(`Giuste: ${correct}; Sbagliate: ${wrong}`);

                    if (domande[cont].type == 'boolean')
                    {
                        for (let i = 0; i < 2; i++)
                        {
                            btn[i].innerHTML = "";
                            let textnode = document.createTextNode(optionsArr[cont][i]);
                            btn[i].appendChild(textnode);
                            answers.append(btn[i]);

                            qstTitle.innerHTML = domande[cont].question;
                        }
                        progValue.innerHTML = 20;
                    }

                    else
                    {
                        for (let i = 0; i < 4; i++)
                        {
                            btn[i].innerHTML = "";
                            let textnode = document.createTextNode(optionsArr[cont][i]);
                            btn[i].appendChild(textnode);
                            answers.append(btn[i]);

                            qstTitle.innerHTML = domande[cont].question;
                        }
                        progValue.innerHTML = 20;
                    }
                }

                else createResults();
            }

            function createResults()
            {
                clearInterval(prog);
                mainBox.innerHTML = '';
                document.getElementById("bp-timer-position").innerHTML="";
                let rpTemp = document.getElementById('rp-template').content;
                let rpHTML = document.importNode(rpTemp, true);
                mainBox.appendChild(rpHTML);
            }

        });
    }
});