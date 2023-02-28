let score = 0;
function createGridElements(){
    const parent = document.querySelector("#gridContainer");
    for(let i = 1;i<=81;i++){
        let divElement = document.createElement("div");
        divElement.classList.add("element_normal");
        parent.appendChild(divElement);
    }    
}
createGridElements();
function fillNumbers(array,listElements){
    for(let i = 0;i<listElements.length;i++){
        if(array.includes(i+1)){
            listElements[i].innerHTML = i+1;
        }
    }
}
function makeRandomNumber(){
    return Math.floor(Math.random()*81) + 1;
}
function makeArray(array){
    while(array.length<10){
        let number = makeRandomNumber();
        if(!array.includes(number)){
            array.push(number);
        }
    }
    return array;
}
function reset(){
    let result = [];
    result = makeArray(result);
    let listElements = document.querySelectorAll(".element_normal");
    for(let element of listElements){
        element.innerHTML="";
    }
    fillNumbers(result,listElements);
}
// console.log(result);
const resetbtn = document.getElementById("resetButton");
resetbtn.addEventListener("click",reset);
let listElements = document.querySelectorAll(".element_normal");
console.log(listElements[0]);
listElements.forEach(function(element){
    element.addEventListener("click",function(e){
        let bombNumber = e.currentTarget.innerHTML;
        console.log(typeof bombNumber,bombNumber+"empty");
        let scoreContainer = document.getElementById("gameScore");
        console.log(score);
        if(bombNumber.length===0){
            score++;
        }
        else{
            score = 0;
        }
        let result = String(score);
        console.log("result is "+result);
        scoreContainer.innerHTML=result;
        });
    
});