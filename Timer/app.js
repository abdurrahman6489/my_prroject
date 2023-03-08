//progress bar
const ProgressBarContainer = document.getElementById("ProgressBar");
const ProgressBar = document.getElementById("ProgressBar");
let resetBtn = document.querySelector(".reset");
let pauseBtn = document.querySelector(".pause");
const startBtn = document.querySelector(".start");

let sec, min, hrs, setTime, startTime, futureTime,remainingTime;
let interval, pauseDuration = 0;
let start = false;

function reset(){
    clearInterval(interval);
    remainingTime = 0;
    start = false;
    let input = document.querySelectorAll(".inputs");
    input[2].value = "";
    input[1].value = "";
    input[0].value = "";
    console.log("timer reset");
}

function pause(){
    let pauseStart = 0;
    let pauseResume = 0;
    if(start){
        pauseStart = Date.now();
        clearInterval(interval);
        pauseBtn.innerHTML = "Resume";
        start = false;
    }
    else{
        pauseResume = Date.now();
        interval = setInterval(countdownTimer,1000);
        pauseBtn.innerHTML = "Pause";
        start = true;
        pauseDuration = pauseResume - pauseStart;
    }
    
}
function countdownTimer(){
    let currentTime = Date.now() - pauseDuration;
    remainingTime = (futureTime - currentTime);
    
    let input = document.querySelectorAll(".inputs");
    if(Math.floor(remainingTime)>0){
        hrs = Math.floor(remainingTime/3600000);
        min = Math.floor(remainingTime/60000) - hrs*60;
        sec = (Math.floor(remainingTime/1000)%60);
        input[2].value = sec;
        input[1].value = min;
        input[0].value = hrs;
        console.log("remaining time "+remainingTime/1000);
        // console.log(sec);
    }
    else{
        reset();
    }
    
}

//adding Event listeners to StartBtn
startBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    //taking input from the timer inputs hr, min and seconds
    if(!start){
        let input = document.querySelectorAll(".inputs");
        sec = input[2].value;
        min = input[1].value;
        hrs = input[0].value;
        sec = Number(sec)*1000;
        min = Number(min)*60000;
        hrs = Number(hrs)*3600000;      
        setTime = sec + min + hrs;
        startTime = Date.now();
        futureTime = startTime + setTime;
        interval = setInterval(countdownTimer,1000);
        start = true;
    }

});

//adding event listener to Reset Btn
resetBtn.addEventListener("click",reset);

//adding event listener to Pause Btn
pauseBtn.addEventListener("click",pause);

//let 
// let i = 0;
// function progress(){
//     if(i==0){
//         i = 1;

//     }
// }
 