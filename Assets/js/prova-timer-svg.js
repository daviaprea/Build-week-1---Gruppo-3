let circularProgress=document.querySelector("circle");
let progValue=document.querySelector("text");
progValue.innerHTML=20;
progBar=Number(progValue.innerHTML);
let cont=0;
let percBar;

let prog=setInterval(()=>{

    cont++;
    percBar=cont/progBar;
    progValue.innerHTML=Number(progValue.innerHTML)-1;

    circularProgress.style.background=`conic-gradient(#00FFFF, ${360*percBar}deg, rgba(131, 131, 131, 0.323) 0deg)`;

    if(progValue.innerHTML=="0") clearInterval(prog);

}, 1000);