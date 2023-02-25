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
const reviews = require(fileNameForReviews)

app.get('/reviews',function(req,resp){
    const reviewKeys = reviews
    resp.send(reviews)
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

})

module.exports = app
