//players' score
let score = 0;
let currentScore = 0;
let elementArray = [];
//to create the Grid for 81 cells
function createGridElements(){
    const parent = document.querySelector("#gridContainer");
    for(let i = 1;i<=81;i++){
        let divElement = document.createElement("div");
        divElement.classList.add("element_normal");
        divElement.setAttribute("element_no",i);
        let id = "cell_"+i;
        divElement.setAttribute("id",id);
        parent.appendChild(divElement);
    }    
}
//calling the function to create 81 cells
createGridElements();


//function to create random number between 1 to 81
function makeRandomNumber(){
    return Math.floor(Math.random()*81) + 1;
}

//making a random numbers unique array of 10 elements
function makeArray(array){
    while(array.length<10){
        let number = makeRandomNumber();
        if(!array.includes(number)){
            array.push(number);
        }
    }
    return array;
}
//filling the numbers of the 
//random numbers unique array in the cells
function putTheBombs(array,listElements){
    for(let i = 0;i<listElements.length;i++){
        if(array.includes(i+1)){
            listElements[i].classList.add("putBombs");
        }
    }
}
//show the result
function showResult(text){
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = text;
    setTimeout(reset,5000);
}

//if placed on the bomb, then show all the bombs
function showTheBombs(curScore){
    const bombs = document.querySelectorAll(".putBombs");
    for(let bomb of bombs){
        bomb.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
        bomb.style.backgroundRepeat = "no-repeat";
        bomb.style.backgroundSize = "contain";
        bomb.style.backgroundPosition = "center";
        bomb.style.backgroundColor = "red";
    }
    showResult("GAME OVER!!! Your score is "+curScore);
}

//reset button functionality
function reset(){
    //element array is used to check if a cell is clicked more than 1 time
    //then score should not increase
    elementArray.length = 0;
    let result = [];
    score = 0;
    result = makeArray(result);
    console.log(result);
    let listElements = document.querySelectorAll(".element_normal");

    //this loop is for removing all the bombs when reset
    for(let element of listElements){
        element.classList.remove("putBombs");
        element.style.backgroundImage = "none";
        element.style.backgroundColor = "#4d1255";
    }
    //bombs are put randomly now
    putTheBombs(result,listElements);

    //to reset the score to zero
    let scoreContainer = document.getElementById("gameScore");
    scoreContainer.innerHTML = 0;

    //to delete the displayed result
    let resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = "";
}

//getting the reset button object
const resetbtn = document.getElementById("resetButton");

//when reset button is clicked, adding event listener
//to make array of 10 random unique numbers and filling in
//the cells
resetbtn.addEventListener("click",reset);

//getting all the cells
let listElements = document.querySelectorAll(".element_normal");

//adding eventlistener to each cell
listElements.forEach(function(element){
    element.addEventListener("click",function(e){
        let elementNo = e.currentTarget.getAttribute("element_no");
        console.log(e.currentTarget);
        let bombNumber = e.currentTarget.classList;
        let scoreContainer = document.getElementById("gameScore");

        if(!bombNumber.contains("putBombs")){
            if(!elementArray.includes(elementNo)){
                score++;
                e.currentTarget.style.backgroundColor = "green";
                elementArray.push(elementNo);
            }
        }
        else{
            currentScore = score;
            score = 0;
            showTheBombs(currentScore);
        }
        let result = String(score);
        console.log("result is "+result);
        scoreContainer.innerHTML=result;
        if(score===71)
            showResult("Congratulations You won, Your score is 71");
        });
});  