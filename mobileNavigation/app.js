function removeImageClass(){
    const images = document.querySelectorAll(".content");
    for(let image of images){
        if(image.classList.contains("show"))
            image.classList.remove("show");
    }
}
function removeButtonClass(){
    const buttons = document.querySelectorAll(".btn");
    for(let btn of buttons){
        if(btn.classList.contains("active"))
            btn.classList.remove("active");
    }
}
const btns = document.querySelectorAll(".btn");
btns.forEach(function(btn){
    btn.addEventListener("click",function(event){
        removeImageClass();
        removeButtonClass();
        const styles = event.currentTarget.classList;
        if(styles.contains("tree")){
            document.getElementById("tree_image").classList.add("show");
            styles.add("active");
        }
        else if(styles.contains("laptops")){
            document.getElementById("laptops_image").classList.add("show");
            styles.add("active");
        }
        else if(styles.contains("pen")){
            document.getElementById("pen_image").classList.add("show");
            styles.add("active");
        }
        else if(styles.contains("newton")){
            document.getElementById("newton_image").classList.add("show");
            styles.add("active");
        }
    });
});
