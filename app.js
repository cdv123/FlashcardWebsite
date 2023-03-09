const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

const fileNameForFlashcards = './flashcards.json';
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const dbFlashcards = require(fileNameForFlashcards);

app.get('/flashcards', function (req, resp) {
    // const flashcardKeys = Object.keys(flashcards)
    resp.send(dbFlashcards);
});

app.get('/flashcards/subject', function (req,resp){
    const subject = dbFlashcards.flashcards.map(a => a.subject)
    resp.send(subject)
})

const fileNameForReviews = './reviews.json';
const dbReviews = require(fileNameForReviews);

app.get('/reviews', function (req, resp) {
    resp.send(dbReviews);
});

app.get('reviews/:flashcard_id/rating', function (req,resp){
    const flashcardId = req.params.flashcard_id
    const selectedReviews = dbReviews.reviews.filter(obj => {
        return obj.flashcard_id === flashcardId
        }
    )
    const selectedRatings = selectedReviews.map(a => a.ratings)
    resp.send(selectedRatings)
})

app.post('/flashcards/add', function (req, resp) {
    const newFlashcard = {};
    newFlashcard.id = dbFlashcards.flashcards[dbFlashcards.flashcards.length - 1].id + 1;
    newFlashcard.subject = req.body.subject;
    newFlashcard.front = req.body.front;
    newFlashcard.back = req.body.back;
    newFlashcard.date_of_creation = req.body.date_of_creation;
    db.flashcards.push(newFlashcard);
    fs.writeFileSync(fileNameForFlashcards, JSON.stringify(dbFlashcards));
    resp.send(dbFlashcards);
});

app.post('/flashcards/update', function (req, resp) {
    let index = 0;
    for (let i = 0; i < dbFlashcards.flashcards.length; i++) {
        if (dbFlashcards.flashcards[i].id === req.body.id) {
            index = i;
        }
    }
    dbFlashcards.flashcards[index].front = req.body.front;
    dbFlashcards.flashcards[index].back = req.body.back;
    dbFlashcards.flashcards[index].subject = req.body.subject;
    dbFlashcards.flashcards[index].date_of_creation = req.body.date_of_creation;
    fs.writeFileSync(fileNameForFlashcards, JSON.stringify(dbFlashcards));
    resp.send(dbFlashcards);
});

app.post('/reviews/add', function (req, resp) {
    const newReview = {};
    newReview.id = dbReviews.reviews[dbReviews.reviews.length - 1].id + 1;
    newReview.review_title = req.body.title;
    newReview.reviewer_name = req.body.name;
    newReview.comment = req.body.content;
    newReview.rating = req.body.rating;
    newReview.flashcard_id = req.body.flashcard_id;
    newReview.date_of_creation = req.body.date_of_creation;
    dbReviews.reviews.push(newReview);
    fs.writeFileSync(fileNameForReviews, JSON.stringify(dbReviews));
    resp.send(dbReviews);
});

module.exports = app;
