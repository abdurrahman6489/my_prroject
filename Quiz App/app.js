let questionAnswerArray = 
[
    {
        0: "",
        1: "",
        2: "",
        3: "",
        correct:3,
    }

]



const palletteContainer = document.querySelector(".pallette-container");
generateQuestionPallette(100);
function generateQuestionPallette(numberOfQuestions){
    for(i=1;i<=numberOfQuestions;i++){
        const btn = document.createElement("button");
        btn.type = "submit";
        btn.classList.add("btn");
        btn.innerHTML = i;
        palletteContainer.appendChild(btn);
    }
}

const questionButton = document.querySelectorAll(".btn");
function removeActive(){
    questionButton.forEach(btn=>{
        btn.classList.remove("active");
    })
}
questionButton.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        removeActive();
        const questionNumber = Number(e.currentTarget.innerHTML);
        console.log(questionNumber);
        e.currentTarget.classList.add("active");
    })
})

let indexArray = [];
function makeRandomNumber(){
    return Math.floor(Math.random()*100)+1;
}
indexArray = makeArray(indexArray);
function makeArray(array){
    while(array.length<100){
        let number = makeRandomNumber();
        if(!array.includes(number)){
            array.push(number);
        }
    }
    let number = makeRandomNumber();
    array.splice(number,0,0);
    return array;
}
console.log(indexArray);
const answerBtns = document.querySelectorAll(".answerBtn");
console.log(answerBtns);
