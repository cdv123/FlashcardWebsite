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

const flashcards = require(fileNameForFlashcards)

app.get('/flashcards',function(req,resp){
    // const flashcardKeys = Object.keys(flashcards)
    resp.send(flashcards)
})

const fileNameForReviews =  './reviews.json'
const reviews = require(fileNameForReviews)

app.get('/reviews',function(req,resp){
    const reviewKeys = reviews
    resp.send(reviews)
})

module.exports = app
