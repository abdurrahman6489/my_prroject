let ProgressBarContainer = document.getElementById("ProgressBar");
let secondInput =  document.getElementById("sec").value;
let minuteInput = document.getElementById("min").value;
let hourInput = document.getElementById("hr").value;
let startTime = document.getElementById("start");
startTime.addEventListener("click",totalTime);
function totalTime(){
    let totalseconds = secondInput*1 + 60*minuteInput + 3600*hourInput;
    console.log(totalseconds);
}

let ProgressBar = document.getElementById("ProgressBar");

// let i = 0;
// function progress(){
//     if(i==0){
//         i = 1;

//     }
// }
