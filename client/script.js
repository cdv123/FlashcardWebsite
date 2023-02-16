
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let rightArrow = document.getElementById("right-arrow")
    let leftArrow = document.getElementById("left-arrow")
    let container = document.querySelector(".container")
    let cols = document.querySelectorAll(".col")
    for (let i = 0; i<cols.length; i++){
        cols[i].addEventListener("click",function (){
            cols[i].classList.add("fade")
            setTimeout(function flip(){
                cols[i].classList.add("fade-in")
                cols[i].classList.remove("fade")
            },200)
        })
    }
    rightArrow.addEventListener("click", function (){
        container.classList.add("fade");
        setTimeout(fade,200)
    })
    leftArrow.addEventListener("click", function (){
        container.classList.add("fade");
        setTimeout(fade,200)
    })
    function fade(){
        container.classList.add("fade-in")
        container.classList.remove("fade")
    }
});

