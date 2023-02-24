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
    for (let i =startPoint; i<flashcardArray.length;i++){
        reviews[i].addEventListener("click", function(){
            showReviews(flashcardArray[i].id)
        })
        if (subjectToShow == ""){
            flashcardsFront[j].innerHTML = flashcardArray[i].front
            flashcardsBack[j].innerHTML = flashcardArray[i].back
            j++
        }

        else if (flashcardArray[i].subject == subjectToShow){
            flashcardsFront[j].innerHTML = flashcardArray[i].front
            flashcardsBack[j].innerHTML = flashcardArray[i].back
            j++
        }
    }

}

async function showReviews(flashcardID){
    console.log(flashcardID)
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
    

}


document.addEventListener('DOMContentLoaded',showFlashcards("", 0))
