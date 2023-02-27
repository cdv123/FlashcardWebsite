
window.addEventListener('DOMContentLoaded', (event) => {
  const rightArrow = document.getElementById('right-arrow')
  const leftArrow = document.getElementById('left-arrow')
  const container = document.querySelector('.container')
  const flashcards = document.querySelectorAll('.flashcards')
  const front = document.querySelectorAll(".flashcard-front-text")
  const back = document.querySelectorAll(".flashcard-back-text")
  const cols = document.querySelectorAll('.col')
  const stars = document.querySelectorAll('.star')
  const submitReview = document.getElementById("submit-review")
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', function () {
      for (let j = 0; j <= i; j++) {
        stars[j].classList.add('yellow')
      }
      for (let j = i + 1; j < stars.length; j++) {
        stars[j].classList.remove('yellow')
      }
    })
  }
  for (let i = 0; i < flashcards.length; i++) {
    flashcards[i].addEventListener('click', function () {
      if (front[i].style.display != "none"){
        front[i].style.display = "none"
        back[i].classList.remove("hide")
      }
      else{
        back[i].classList.add("hide")
        front[i].style.display = "block"
      }
      cols[i].classList.add('fade')
      setTimeout(function flip () {
        cols[i].classList.add('fade-in')
        cols[i].classList.remove('fade')
      }, 200)
    })
  }
  rightArrow.addEventListener('click', function () {
    container.classList.add('fade')
    setTimeout(fade, 200)
  })
  leftArrow.addEventListener('click', function () {
    container.classList.add('fade')
    setTimeout(fade, 200)
  })
  function fade () {
    container.classList.add('fade-in')
    container.classList.remove('fade')
  }

  function removeColours(){
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('yellow')
    }
  }
  submitReview.addEventListener('click', function(){
    setTimeout(removeColours,100)
  })
  wrapper = document.querySelectorAll(".wrapper")
  window.addEventListener("resize", function(){
    if (window.innerWidth < 780){
      for (let i =0; i<wrapper.length; i++){
        if (wrapper[i].classList.contains("row")){
          wrapper[i].classList.remove("row")
          wrapper[i].classList.remove("no-gutters")
        }
      }
      for (let i =0; i<cols.length; i++){
        if (!cols[i].classList.contains("row")){
          cols[i].classList.add("row")
          cols[i].classList.add("no-gutters")
        }
      }
    }
    else{
      for (let i =0; i<wrapper.length; i++){
        if (!wrapper[i].classList.contains("row")){
          wrapper[i].classList.add("row")
          wrapper[i].classList.add("no-gutters")
        }
      }
      for (let i =0; i<cols.length; i++){
        if (cols[i].classList.contains("row")){
          cols[i].classList.remove("row")
          cols[i].classList.remove("no-gutters")
        }
      }
    }
  })
})
