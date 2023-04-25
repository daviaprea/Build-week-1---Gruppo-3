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
            var cont=0;
            var correct=0;
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
            let timerCircle=document.getElementById("f-circle");
            let progValue = document.getElementById("seconds");
            progValue.innerHTML = 20;
            progBar = Number(progValue.innerHTML);

            let prog = setInterval(() => {

                progValue.innerHTML = Number(progValue.innerHTML) - 1;

                if(progValue.innerHTML == "0") btnHandler(false);

            }, 1000);

            function btnHandler(b=true)
            {
                if(b==false)
                {
                    wrong++;
                    b=true;
                    progValue.innerHTML = 20;
                    
                    
                }

                answers.innerHTML="";
                cont++;
                qstCont.innerHTML=cont+1;

                console.log(`Giuste: ${correct}; Sbagliate: ${wrong}`);
                
                if(cont<10)
                {
                    if(domande[cont].type == 'boolean')
                    {
                        for(let i=0; i<2; i++)
                        {
                            btn[i].innerHTML="";
                            let textnode = document.createTextNode(optionsArr[cont][i]);
                            btn[i].appendChild(textnode);
                            answers.append(btn[i]);

                            qstTitle.innerHTML=domande[cont].question;
                        }
                        progValue.innerHTML = 20;

                    }

                    else
                    {
                        for(let i=0; i<4; i++)
                        {
                            btn[i].innerHTML="";
                            let textnode = document.createTextNode(optionsArr[cont][i]);
                            btn[i].appendChild(textnode);
                            answers.append(btn[i]);

                            qstTitle.innerHTML=domande[cont].question;
                        }
                        progValue.innerHTML = 20;

                    }
                }
                else createResults(wrong*10, correct*10);
            }

            function createResults(w, c)
            {
                clearInterval(prog);
                mainBox.innerHTML = '';
                document.getElementById("bp-timer-position").innerHTML="";
                let rpTemp = document.getElementById('rp-template').content;
                let rpHTML = document.importNode(rpTemp, true);

                mainBox.appendChild(rpHTML);

                let ctx=document.getElementById("myChart").getContext("2d");

                let chart=new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: ["Wrong", "Correct"],

                        datasets: [{
                            label: "My first dataset",
                            backgroundColor: ["#C2128D", "#00FFFF"],
                            data: [w, c],
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        cutout: "70%",
                        animation:{
                            animateScale: true
                        }
                    },
                    plugins: [{
                        id: 'text',
                        afterDatasetsDraw: function(chart)
                        {
                            let {ctx}=chart;
                            ctx.save();
                            let x=chart.getDatasetMeta(0).data[0].x;
                            let y=chart.getDatasetMeta(0).data[0].y;
                            let textTitle="";
                            let textRes="";
                            let textComm1=`We'll send you the certificate`;
                            let textComm2=`in a few minutes.`;
                            let textComm3=`Check your email (including`;
                            let textComm4=`promotions / spam folder)`;

                            if(c>w)
                            {
                                textTitle="Congratulations!";
                                textRes="You passed the exam.";
                            }

                            else
                            {
                                textTitle="Oh no!";
                                textRes="You didn't pass the exam.";
                            }

                            ctx.textAlign="center";
                            ctx.textBaseline="middle";

                            ctx.font="bold 18px Jost"
                            ctx.fillStyle="white";
                            ctx.fillText(textTitle, x, y-55);

                            ctx.font="bold 18px Jost"
                            ctx.fillStyle="#01EAEE";
                            ctx.fillText(textRes, x, y-30);

                            ctx.font="15px Jost"
                            ctx.fillStyle="white";
                            ctx.fillText(textComm1, x, y+10);
                            ctx.font="15px Jost"
                            ctx.fillStyle="white";
                            ctx.fillText(textComm2, x, y+25);
                            ctx.font="15px Jost"
                            ctx.fillStyle="white";
                            ctx.fillText(textComm3, x, y+40);
                            ctx.font="15px Jost"
                            ctx.fillStyle="white";
                            ctx.fillText(textComm4, x, y+55);
                        }
                    }]
                });

                document.querySelector('#c-percent span').innerHTML = `${c}%`;
                document.querySelector('#w-percent span').innerHTML = `${w}%`;

                let cNum = document.getElementById('c-number');
                let wNum = document.getElementById('w-number');

                cNum.innerHTML = correct;
                cNum.style.display = 'inline'
                wNum.innerHTML = wrong;
                wNum.style.display = 'inline'

                document.getElementById("rate-button").addEventListener("click", ()=>{
                    mainBox.innerHTML = '';
                    let fbTemp = document.getElementById('fb-template').content;
                    let fbHTML = document.importNode(fbTemp, true);
                    mainBox.appendChild(fbHTML);
                });
            }
        });
    }
});