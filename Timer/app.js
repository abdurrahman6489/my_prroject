//progress bar
const progressBarContainer = document.getElementById("ProgressBar");
const progressBar = document.getElementById("bar");
const progressIndicator = document.querySelector(".progressIndicator");
//reset, pause and start buttons
const resetBtn = document.querySelector(".reset");
const pauseBtn = document.querySelector(".pause");
const startBtn = document.querySelector(".start");

//variables
let sec, min, hrs, setTime, startTime, futureTime, remainingTime;
let interval, pauseDuration = 0;
let start = false;
let pauseStart = 0;
let pauseResume = 0;
let widthofProgessBar = 1;


//reset function to reset the timer to initial stage
function reset(){
    clearInterval(interval);
    remainingTime = 0;
    start = false;
    pauseDuration = 0;
    pauseBtn.innerHTML = "Pause";
    progressBarIndicator(0);
    progressIndicatorPercent(0);
    let input = document.querySelectorAll(".inputs");
    input[2].value = "00";
    input[1].value = "00";
    input[0].value = "00";
    console.log("timer reset");
}

//pause the timer it will hold the previous time
function pause(){
    if(start){
        pauseStart = Date.now();
        clearInterval(interval);
        pauseBtn.innerHTML = "Resume";
        start = false;
    }
    else{
        pauseResume = Date.now();
        pauseDuration += pauseResume - pauseStart;
        pauseBtn.innerHTML = "Pause";
        start = true;
        // console.log("pause duration from pause function is "+pauseDuration);
        interval = setInterval(countdownTimer,1000);
    }
}

//main function to count down the timer
function countdownTimer(){
    let currentTime = Date.now() ;
    remainingTime = (futureTime - currentTime) + pauseDuration;
    // console.log("pause duration from countDownTimer function is "+pauseDuration);
    let input = document.querySelectorAll(".inputs");
    if(Math.floor(remainingTime)>0){
        hrs = Math.floor(remainingTime/3600000);
        min = Math.floor(remainingTime/60000) - hrs*60;
        sec = (Math.floor(remainingTime/1000)%60);
        input[2].value = sec;
        input[1].value = min;
        input[0].value = hrs;
        // console.log("remaining time "+remainingTime/1000);
        widthofProgessBar = (remainingTime*100)/setTime;
        console.log("width of progress bar is "+ widthofProgessBar);
        progressBarIndicator(100-widthofProgessBar);
        progressIndicatorPercent(100-widthofProgessBar)
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
        start = true;
        interval = setInterval(countdownTimer,1000);
    }

});

//adding event listener to Reset Btn
resetBtn.addEventListener("click",reset);

//adding event listener to Pause Btn
pauseBtn.addEventListener("click",pause);


function progressBarIndicator(width=1){
    console.log("width is "+width);
    progressBar.style.width = width+"%";
}
function progressIndicatorPercent(percent){  
    percent = parseInt(percent);
    progressIndicator.innerHTML = percent+"%";
}


 