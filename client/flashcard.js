const endpointRoot = 'http://127.0.0.1:8080/';

async function showFlashcards(subjectToShow, startPoint){
    const flashcardsResponse = await fetch(endpointRoot + 'flashcards');
    const flashcardKeysText = await flashcardsResponse.text();
    const flashcardKeys = JSON.parse(flashcardKeysText)
    const flashcardsFront = document.querySelectorAll('.flashcard-front-text')
    const flashcardsBack = document.querySelectorAll('.flashcard-back-text')
    const reviews = document.querySelectorAll('.see-reviews')
    flashcardArray = flashcardKeys.flashcards
    let j =0
    if (startPoint>=flashcardArray.length){
        for (let i = 0; i<flashcardArray.length;i++){
            flashcardsFront[i].innerHTML = "Empty"
            flashcardsBack[i].innerHTML = "Empty"
        }
    }
    
    else if (startPoint<0){
        startPoint = flashcardArray.length+startPoint
    }
    let counter2 = 0
    let max = 9
    if (flashcardArray.length<9){
        max = flashcardArray.length
    }
    for (let i =startPoint; i<max;i++){
        reviews[i].addEventListener("click", function(){
            showReviews(flashcardArray[i].id,true)
        })
        if (subjectToShow == ""){
            counter2+=1
            flashcardsFront[j].innerHTML = flashcardArray[i].front
            flashcardsBack[j].innerHTML = flashcardArray[i].back
            j++
        }
        else if (flashcardArray[i].subject == subjectToShow){
            counter2+=1
            flashcardsFront[j].innerHTML = flashcardArray[i].front
            flashcardsBack[j].innerHTML = flashcardArray[i].back
            j++
        }
    }
    for (let i =counter2; i<flashcardsFront.length;i++){
        flashcardsFront[i].innerHTML = "Empty"
        flashcardsBack[i].innerHTML = "Empty"
    }
}
async function showReviews(flashcardID,update){
    const reviewResponse = await fetch(endpointRoot + 'reviews')
    const reviewResponseText = await reviewResponse.text();
    const reviewKeys = JSON.parse(reviewResponseText)
    const review = document.querySelector(".list-of-reviews")
    reviewArray = reviewKeys.reviews
    let reviewList = ''
    let c =0
    for (let i = 0; i<reviewArray.length;i++){
        if (reviewArray[i].flashcard_id == flashcardID){
            c=1
            reviewList+=`<h3 class = "review-titles"> ${reviewArray[i].review_title} - ${reviewArray[i].rating}</h3><p>${reviewArray[i].comment}</p><p>Written by ${reviewArray[i].reviewer_name}</p>`
        }
    }
    if (c==1){
        review.innerHTML = reviewList
    }
    else if (c==0){
        review.innerHTML = "Empty"
    }
    if (update == true){
        postReviews()
    }

}

async function showSubjects(){
    const flashcardsResponse = await fetch(endpointRoot + 'flashcards');
    const flashcardKeysText = await flashcardsResponse.text();
    const flashcardKeys = JSON.parse(flashcardKeysText)
    const chooseSubject = document.getElementById("select-subject")
    flashcardArray = flashcardKeys.flashcards
    let subjects = []
    for (let i = 0; i<flashcardArray.length; i++){
        if (!subjects.includes(flashcardArray[i].subject)){
            subjects.push(flashcardArray[i].subject)
        }
    }
    chooseSubject.innerHTML = `<option selected>Please select subject</option>`
    for (let i = 0; i<subjects.length; i++){
        chooseSubject.innerHTML+= `<option value="${i+1}">${subjects[i]}</option>`
    }
}

async function postFlashcards(){
    const flashcardForm = document.getElementById("flashcard_form")
    flashcardForm.addEventListener("submit",async function(event){
        event.preventDefault();
        const data = new FormData(flashcardForm)
        const json = JSON.stringify(Object.fromEntries(data))
        const response = await fetch(endpointRoot + 'flashcards/add',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: json
        })
        const selectSubject2 = document.getElementById("select-subject")
        value = selectSubject2.options[selectSubject2.selectedIndex].text
        counter = 0
        if (value == "Please select subject"){
            showFlashcards("",0)
        }
        else{
            showFlashcards(value,0)
        }
        showSubjects()
        flashcardForm.reset()
    })  
}

async function postReviews(flashcardID){
    const reviewForm = document.getElementById("review")
    reviewForm.addEventListener("submit", async function(event){
        event.preventDefault();
        const data = new FormData(reviewForm)
        const stars = document.querySelectorAll(".star")
        const rating = 1
        for (let i = stars.length-1; i >= 0; i--){
            if (stars[i].style.color == "yellow"){
                rating = i+1
                break
            }
        }
        data.append("flashcard_id", flashcardID)
        data.append("rating",rating)
        const json = JSON.stringify(Object.fromEntries(data))
        const reponse = await fetch(endpointRoot + 'reviews/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: json
        })
        showReviews(flashcardID, false)
        reviewForm.reset()
    })
}

document.addEventListener('DOMContentLoaded',showFlashcards("", 0))
document.addEventListener('DOMContentLoaded', function(){
    let counter = 0
    const selectSubject = document.getElementById("select-subject")
    selectSubject.addEventListener("change",function(){
        value = selectSubject.options[selectSubject.selectedIndex].text
        counter = 0
        if (value == "Please select subject"){
            showFlashcards("",0)
        }
        else{
            showFlashcards(value,0)
        }
    })
    const rightArrow = document.getElementById("right-arrow")
    const leftArrow = document.getElementById("left-arrow")
    rightArrow.addEventListener("click", function(){
        value = selectSubject.options[selectSubject.selectedIndex].text
        counter+=9
        showFlashcards(value, counter)
    })
    leftArrow.addEventListener("click", function(){
        value = selectSubject.options[selectSubject.selectedIndex].text
        counter-=9
        showFlashcards(value, counter)
    })
    showSubjects()
    postFlashcards()
})
