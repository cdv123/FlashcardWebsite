const express = require('express')
const app = express()
const hostname = '127.0.0.1'
const fs = require('fs')
const port = 8080
const cors = require('cors')

app.use(cors())

const fileNameForFlashcards =  './flashcards.json'
app.use(express.json())
const path = require('path')
app.use(express.static(path.join(__dirname, 'client')))

const db = require(fileNameForFlashcards)

app.get('/flashcards',function(req,resp){
    // const flashcardKeys = Object.keys(flashcards)
    resp.send(db)
})

const fileNameForReviews =  './reviews.json'
const db2 = require(fileNameForReviews)

app.get('/reviews',function(req,resp){
    const reviewKeys = db2
    resp.send(db2)
})

app.post('/flashcards/add', function(req,resp){
    let newFlashcard = {}
    newFlashcard.id = db.flashcards[db.flashcards.length-1].id+1
    newFlashcard.subject = req.body.subject;
    newFlashcard.front = req.body.front;
    newFlashcard.back = req.body.back
    db.flashcards.push(newFlashcard)
    fs.writeFileSync(fileNameForFlashcards, JSON.stringify(db));
    resp.send(db);
})

app.post('/reviews/add', function(req,resp){
    let newReview = {}
    newReview.id = db2.reviews[db2.reviews.length-1].id+1
    newReview.review_title = req.body.title;
    newReview.reviewer_name = req.body.name;
    newReview.comment = req.body.content;
    newReview.rating = req.body.rating;
    newReview.flashcard_id = req.body.flashcard_id;
    newReview.date_of_creation = req.body.date_of_creation;
    db2.reviews.push(newReview)
    fs.writeFileSync(fileNameForReviews, JSON.stringify(db2));
    resp.send(db2);
})

module.exports = app
