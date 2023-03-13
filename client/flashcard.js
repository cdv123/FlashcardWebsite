const endpointRoot = 'http://127.0.0.1:8080/';
var counter = 0;
var reviews = document.querySelectorAll('.see-reviews');



async function showFlashcards (subjectToShow) {
    try{
    const flashcardsResponse = await fetch(endpointRoot + 'flashcards');
    const flashcardKeysText = await flashcardsResponse.text();
    const flashcardKeys = JSON.parse(flashcardKeysText);
    const flashcardsFront = document.querySelectorAll('.flashcard-front-text');
    const flashcardsBack = document.querySelectorAll('.flashcard-back-text');
    const flashcardArray = flashcardKeys.flashcards;
    let j = 0;
    let counter2 = 0;
    relevantCards = []
    if (subjectToShow == ''){
        relevantCards = flashcardArray
}
    else{
        for (i = 0; i<flashcardArray.length; i++){
            if (flashcardArray[i].subject == subjectToShow) {
            relevantCards.push(flashcardArray[i])
            }
        }
    }
    if (counter < 0){
        counter = Math.ceil(relevantCards.length/9)*9-9
    }
    else if (counter > relevantCards.length){
        counter = 0
    }
    let max = 9+counter;
    if (relevantCards.length < 9 || max > relevantCards.length) {
        max = relevantCards.length;
    }
    
    for (let  i = counter; i < max; i++) {
        reviews[i-counter].onclick = function(){
            showReviews(relevantCards[i].id,true)
        };
        counter2+=1
        flashcardsFront[j].innerHTML = relevantCards[i].front;
        flashcardsBack[j].innerHTML = relevantCards[i].back
        j++;
    }
    for (let i = counter2; i < flashcardsFront.length; i++) {
        flashcardsFront[i].innerHTML = 'Empty';
        flashcardsBack[i].innerHTML = 'Empty';
    }}
    catch{
        alert("Connection to server lost, cannot show flashcards")
    }
}
async function showAllFlashcards (sortBy) {
    try{
        const flashcardResponse = await fetch(endpointRoot + 'flashcards');
        const flashcardKeysText = await flashcardResponse.text();
        const flashcardKeys = JSON.parse(flashcardKeysText);
        const flashcardArray = flashcardKeys.flashcards;
        function compareAttribute (attr) {
            return function (a, b) {
                if (a[attr].toUpperCase() < b[attr].toUpperCase()) {
                    return -1;
                  }
                  if (a[attr].toUpperCase() > b[attr].toUpperCase()) {
                    return 1;
                  }
                  return 0; ;
              };
        }
        if (sortBy === 'date_of_creation') {
            flashcardArray.sort(function (a, b) { return new Date(b.date_of_creation) - new Date(a.date_of_creation); });
        } else if (sortBy !== 'Sort by:') {
            const comparison = compareAttribute(sortBy);
            flashcardArray.sort(comparison);
        }
        const container = document.getElementById('all-flashcards');
        const editFront = document.getElementById('front-flashcard2');
        const editBack = document.getElementById('back-flashcard2');
        const editSubject = document.getElementById('subject4');
        let listToAdd = '';
        for (let i = 0; i < flashcardArray.length; i++) {
            listToAdd += `<div class = "every-flashcard" data-bs-dismiss="modal"> <p> Front of card: ${flashcardArray[i].front}</p> <p> Back of card: ${flashcardArray[i].back}</p> <p> Subject of card: ${flashcardArray[i].subject}</p> <p> Date of creation: ${flashcardArray[i].date_of_creation}</p></div>`;
        }
        container.innerHTML = listToAdd;
        const everyFlashcard = document.querySelectorAll('.every-flashcard');
        for (let i = 0; i < everyFlashcard.length; i++) {
            everyFlashcard[i].addEventListener('click', function () {
                editFront.value = flashcardArray[i].front;
                editBack.value = flashcardArray[i].back;
                editSubject.value = flashcardArray[i].subject;
                postEdits(flashcardArray[i].id);
            });
        }

    }
    catch(err){
        alert("connection to server lost, cannot show flashcards")
    }
}
async function showReviews (flashcardID, update) {
    try{
    const reviewResponse = await fetch(`http://127.0.0.1:8080/reviews/${flashcardID}`);
    const reviewResponseText = await reviewResponse.text();
    const selectedReviews = JSON.parse(reviewResponseText);
    const reviewRatingResponse = await fetch(`http://127.0.0.1:8080/reviews/${flashcardID}/rating`);
    const reviewRatingResponseText = await reviewRatingResponse.text();
    const selectedRatings = JSON.parse(reviewRatingResponseText);
    const review = document.querySelector('.list-of-reviews');
    let averageRating = 0
    let reviewList = '';
    if (selectedRatings.length > 0){
        for (let i = 0; i< selectedRatings.length; i++){
            averageRating+= parseInt(selectedRatings[i].charAt(0))
        }
        averageRating /= selectedRatings.length
        averageRating = Math.round(averageRating * 100) / 100
        reviewList += `<h3 class = "average-rating" > The average rating for this flashcard is ${averageRating}/5`
    }

    for (let i = 0; i < selectedReviews.length; i++) {
        reviewList += `<h3 class = "review-titles"> ${selectedReviews[i].review_title} - ${selectedReviews[i].rating}</h3><p>${selectedReviews[i].comment}</p><p>Written by ${selectedReviews[i].reviewer_name}</p>`;
    }
    if (selectedReviews.length > 0) {
        review.innerHTML = reviewList;
    } else {
        review.innerHTML = 'Currently, this flashcard has no reviews, feel free to add one!';
    }
    if (update === true) {
        postReviews(flashcardID);
    }}
    catch {
        alert("Connection to server lost, cannot show reviews")
    }
}


async function showSubjects () {
    try{
    const subjectKeysRespone = await fetch(endpointRoot + 'flashcards/subject')
    const subjectKeysText = await subjectKeysRespone.text();
    const subjects = JSON.parse(subjectKeysText)
    const uniqueSubjects = [... new Set(subjects)]
    const chooseSubject = document.getElementById('select-subject');
    chooseSubject.innerHTML = '<option selected>Please select subject</option>';
    for (let i = 0; i < uniqueSubjects.length; i++) {
        chooseSubject.innerHTML += `<option value="${i + 1}">${uniqueSubjects[i]}</option>`;
    }
    }
    catch{
        alert("Server down, could not load subjects")
    }   
} 

async function searchFlashcards(){
    const searchForm = document.getElementById('search-form')
    searchForm.addEventListener('submit', async function(event){
        event.preventDefault();
        try{
        const data = new FormData(searchForm)
        const json = JSON.stringify(Object.fromEntries(data))
        const searchInput = JSON.parse(json)
        const search = searchInput.front
        const response = await fetch(endpointRoot + `flashcards/search?searchquery=${search}`)
        const responseText = await response.text()
        const flashcards = JSON.parse(responseText)
        const container = document.getElementById('all-flashcards');
        const editFront = document.getElementById('front-flashcard2');
        const editBack = document.getElementById('back-flashcard2');
        const editSubject = document.getElementById('subject4');
        let listToAdd = '';
        for (let i = 0; i < flashcards.length; i++) {
            listToAdd += `<div class = "every-flashcard" data-bs-dismiss="modal"> <p> Front of card: ${flashcards[i].front}</p> <p> Back of card: ${flashcards[i].back}</p> <p> Subject of card: ${flashcards[i].subject}</p> <p> Date of creation: ${flashcards[i].date_of_creation}</p></div>`;
        }
        container.innerHTML = listToAdd;
        const everyFlashcard = document.querySelectorAll('.every-flashcard');
        for (let i = 0; i < everyFlashcard.length; i++) {
            everyFlashcard[i].addEventListener('click', function () {
                editFront.value = flashcards[i].front;
                editBack.value = flashcards[i].back;
                editSubject.value = flashcards[i].subject;
                postEdits(flashcards[i].id);
            });
        }}
        catch{
            alert("Connection to server lost, cannot search flashcards")
        }
    })
}

async function postEdits (flashcardID) {
    const editFlashcardForm = document.getElementById('flashcard_form2');
    editFlashcardForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const data = new FormData(editFlashcardForm);
        data.append('id', flashcardID);
        const json = JSON.stringify(Object.fromEntries(data));
        try{
        const response = await fetch(endpointRoot + 'flashcards/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: json
        });
        showSubjects();
        showFlashcards('');
        editFlashcardForm.reset();
        }
        catch{

        }
    });
}

async function postFlashcards () {
    const flashcardForm = document.getElementById('flashcard_form');
    flashcardForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const data = new FormData(flashcardForm);
        const day = new Date();
        data.append('date_of_creation', day);
        const json = JSON.stringify(Object.fromEntries(data));
        try {
        const response = await fetch(endpointRoot + 'flashcards/add',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: json
        });
        const selectSubject2 = document.getElementById('select-subject');
        const value = selectSubject2.options[selectSubject2.selectedIndex].text;
        if (value === 'Please select subject') {
            showFlashcards('');
        } else {
            showFlashcards(value);
        }
        showSubjects();
        flashcardForm.reset();
} catch (err) {
            alert('conncetion to server lost');
        }
    });
}

async function postReviews (flashcardID) {
    const reviewForm = document.getElementById('review');
    reviewForm.onsubmit= async function (event) {
        try {
        event.preventDefault();
        const data = new FormData(reviewForm);
        const stars = document.querySelectorAll('.star');
        let rating = 1;
        for (let i = stars.length - 1; i >= 0; i--) {
            if (stars[i].classList.contains('yellow')) {
                rating = i + 1;
                break;
            }
        }
        const day = new Date();
        const date = day.getDate().toString() + '/' + day.getMonth().toString() + '/' + day.getFullYear().toString() + ' ' + day.getHours().toString() + ':' + day.getMinutes().toString();
        rating = rating.toString();
        rating = `${rating}/5`;
        data.append('flashcard_id', flashcardID);
        data.append('rating', rating);
        data.append('date_of_creation', date);
        const json = JSON.stringify(Object.fromEntries(data));
        const reponse = await fetch(endpointRoot + 'reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: json
        });

        showReviews(flashcardID, false);
        reviewForm.reset();
} catch (err) {
            alert('connection to server lost');
        }
    };
}

document.addEventListener('DOMContentLoaded', showFlashcards('', 0));
document.addEventListener('DOMContentLoaded', function () {

    const selectSubject = document.getElementById('select-subject');
    selectSubject.addEventListener('change', function () {
        const value = selectSubject.options[selectSubject.selectedIndex].text;
        counter = 0;
        if (value === 'Please select subject') {
            showFlashcards('');
        } else {
            showFlashcards(value);
        }
    });
    const rightArrow = document.getElementById('right-arrow');
    const leftArrow = document.getElementById('left-arrow');
    rightArrow.addEventListener('click', function () {
        const value = selectSubject.options[selectSubject.selectedIndex].text;
        counter += 9;
        if (value === 'Please select subject') {
            showFlashcards('');
        } else {
            showFlashcards(value);
        }
    });
    leftArrow.addEventListener('click', function () {
        const value = selectSubject.options[selectSubject.selectedIndex].text;
        counter -= 9;
        if (value === 'Please select subject') {
            showFlashcards('');
        } else {
            showFlashcards(value);
        }
    });
    const editFlashcard = document.getElementById('edit-flashcard');
    editFlashcard.addEventListener('click', function () {
        showAllFlashcards('Sort by:');
    });
    const sortBy = document.getElementById('sort-by');
    sortBy.addEventListener('change', function () {
        let value = sortBy.options[sortBy.selectedIndex].text;
        if (value === 'Date of creation') {
            value = 'date_of_creation';
        } else if (value === 'Subject (alphabetical order)') {
            value = 'subject';
        } else if (value === 'Front (alphabetical order)') {
            value = 'front';
        } else if (value === 'Back (alphabetical order)') {
            value = 'back';
        }
        showAllFlashcards(value);
    });
    showSubjects();
    postFlashcards();
    searchFlashcards();
});
