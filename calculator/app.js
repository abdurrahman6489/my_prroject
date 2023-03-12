let result = "";
const input = document.querySelector("#lcd-display");
let buttons = document.querySelectorAll(".button");
function showResult(result){
    input.innerHTML = result;
}
function copyAnswer(){
    navigator.clipboard.writeText(input.innerHTML);
    alert("copied "+input.innerHTML);
}
buttons.forEach(button=>{
    button.addEventListener("click",(e)=>{
        if(e.currentTarget.innerHTML ==="AC")
            result = "";
        else if(e.currentTarget.innerHTML==="C")
            result = result.toString().slice(0,-1);
        else if(e.currentTarget.innerHTML==="=")
            result = result+"="+eval(result);
        else if(e.currentTarget.innerHTML ==="cpy")
            copyAnswer();
        else if(e.currentTarget.innerHTML==="." && result.toString().includes("."))
            result = result + "";
        else{
            result = result + e.currentTarget.innerHTML;   
        }
        showResult(result);   
    })
})