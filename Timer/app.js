//progress bar
let ProgressBarContainer = document.getElementById("ProgressBar");
let ProgressBar = document.getElementById("ProgressBar");

//taking input from the timer inputs hr, min and seconds
let secondInput =  document.getElementById("sec");
let minuteInput = document.getElementById("min");
let hourInput = document.getElementById("hr");

//calculating seconds, minutes and hours
let seconds = Number(secondInput.value);
let minutes = Number(minuteInput.value);
let hours = Number(hourInput.value);
let setTime = Number(secondInput.value) + Number(minuteInput.value)*60 + Number(hourInput.value)*3600;
let startTiem = new Date();
console.log(setTime);

//adding Event listeners to StartBtn
let startBtn = document.getElementById("start");
startBtn.addEventListener("click",totalTime);
startBtn.addEventListener("click",showSeconds);

//adding event listener to Reset Btn
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click",totalTime);

//adding event listener to Pause Btn
let pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener("click",totalTime);

//let 
// let i = 0;
// function progress(){
//     if(i==0){
//         i = 1;

//     }
// }
