
window.addEventListener('DOMContentLoaded', (event) => {
  const rightArrow = document.getElementById('right-arrow')
  const leftArrow = document.getElementById('left-arrow')
  const container = document.querySelector('.container')
  const flashcards = document.querySelectorAll('.flashcards')
  const cols = document.querySelectorAll('.col')
  const stars = document.querySelectorAll('.star')
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
})
