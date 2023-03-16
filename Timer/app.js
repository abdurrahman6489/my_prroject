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

//interval is name given to function for countdowntimer function
//to setInterval and clearInterval
let interval;

//pause duration is to get the milliseconds for which
// the timer was paused
let pauseDuration = 0;

//start and pauseStatus are for checking the status of
//start and pause status of timer
let start = false, pauseStatus = false;

//pauseStart and pauseResume to get the time when the
//pause button was clicked
let pauseStart = 0;
let pauseResume = 0;

//the below variables are for storing the condition
//of progress of timer
let widthofProgessBar = 0;
let progressBarColor = "green";
let progressIndicatorColor = "green";


//reset function to reset the timer to initial stage
function reset(){
    clearInterval(interval);
    removeActiveClassBtns();
    resetBtn.classList.add("active");
    remainingTime = 0;
    start = false;
    pauseDuration = 0;
    pauseBtn.innerHTML = "Pause";
    progressBar.style.backgroundColor = progressBarColor;
    progressIndicator.style.color = progressIndicatorColor;
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
    if(start && !pauseStatus){
        pauseStart = Date.now();
        clearInterval(interval);
        pauseBtn.innerHTML = "Resume";
        removeActiveClassBtns();
        pauseBtn.classList.add("active");
        start = false;
        pauseStatus = true;
    }
    else if(!start && pauseStatus){
        pauseResume = Date.now();
        pauseDuration += pauseResume - pauseStart;
        pauseBtn.innerHTML = "Pause";
        removeActiveClassBtns();
        pauseBtn.classList.add("active");
        start = true;
        pauseStatus = false;
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
        widthofProgessBar = 100 - (remainingTime*100)/setTime;
        console.log("width of progress bar is "+ widthofProgessBar);
        progressBarIndicator(widthofProgessBar);
        progressIndicatorPercent(widthofProgessBar);
        removeActiveClassBtns();
        startBtn.classList.add("active");
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
        removeActiveClassBtns();
        startBtn.classList.add("active");
    }

});

//adding event listener to Reset Btn
resetBtn.addEventListener("click",reset);

//adding event listener to Pause Btn
pauseBtn.addEventListener("click",pause);

//function to show progress of timer using progressBar
function progressBarIndicator(width=0){
    console.log("width is "+ width);
    if(width>=90)
        progressBarColor = "red";
    else if(width>=80)
        progressBarColor = "orange";
    else
        progressBarColor = "green";
    progressBar.style.backgroundColor = progressBarColor;
    progressBar.style.width = width+"%";
}

//function to show progress of timer in percent using progressIndicator
function progressIndicatorPercent(percent){  
    percent = parseInt(percent);
    
    if(percent>=90)
        progressIndicatorColor = "red";
    else if(percent>=80)
        progressIndicatorColor = "orange";
    else
        progressIndicatorColor = "green";
    
    if(percent>0)
        progressIndicator.innerHTML = percent+"%";
    else
        progressIndicator.innerHTML = "";
            
    progressIndicator.style.color = progressIndicatorColor;
}
function removeActiveClassBtns(){
    const btns = document.querySelectorAll(".btn");
    btns.forEach(button=>{
        button.classList.remove("active");
    })
}


 