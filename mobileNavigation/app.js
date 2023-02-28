function add_removeClass(array,item,addclass){
    for(let element of array){
        if(element.classList.includes(item))
            element.classList.add(addclass);
        else
            element.classList.remove(addclass);
    }
}

const image1 = document.querySelector("#tree_image");
const image2 = document.querySelector("#laptops_image");
const image3 = document.querySelector("#pen_image");
const image4 = document.querySelector("#newton_image");
const btns = document.querySelectorAll(".btn");
btns.forEach(function(btn){
    btn.addEventListener("click",function(event){
        const styles = event.currentTarget.classList;
        if(styles.contains("tree")){
            image1.classList.add("show");
            image2.classList.remove("show");
            image3.classList.remove("show");
            image4.classList.remove("show");
            add_removeClass(btns,"tree","active");
        }
        else if(styles.contains("laptops")){
            image2.classList.add("show");
            image1.classList.remove("show");
            image3.classList.remove("show");
            image4.classList.remove("show");
            add_removeClass(btns,"laptops","active");
        }
        else if(styles.contains("pen")){
            image3.classList.add("show");
            image2.classList.remove("show");
            image1.classList.remove("show");
            image4.classList.remove("show");
            add_removeClass(btns,"pen","active");
        }
        else if(styles.contains("newton")){
            image4.classList.add("show");
            image2.classList.remove("show");
            image3.classList.remove("show");
            image1.classList.remove("show");
            add_removeClass(btns,"newton","active");
        }
    });
});
