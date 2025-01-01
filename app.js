let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=['yellow','red','purple','green'];

let h2=document.querySelector('h2');
let highScore=document.querySelector('.high');
let max=0;

document.addEventListener('keypress',function(){
    if(started==false){
        console.log('game started')
        started=true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    // console.log('curr level',level);

    if(gameSeq[idx]===userSeq[idx]){
        // console.log("same value");
        if(userSeq.length==gameSeq.length)
            setTimeout(levelUp,1000);
    }else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b><br>press any other key to start.`;
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        },150)
        if(max<level){
            max=level;
            highScore.innerText=`your highest score is ${max}`;
        }
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}