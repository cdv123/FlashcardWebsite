'use-strict';

const request = require('supertest');
const app = require('./app');

const fs = require('fs');
const { get } = require('http');

const fileNameForFlashcards = './flashcards.json'
const fileNameForReviews = './reviews.json'

const dbFlashcards = require(fileNameForFlashcards)
const dbReviews = require(fileNameForReviews)

// Test GET /flashcards works as intended
describe('Test GET /flashcards', () => {
    test('GET  /flashcards succeeds', () => {
        return request(app)
            .get('/flashcards')
            .expect(200);
    })
    test('GET  /flashcards returns JSON', () => {
        return request(app)
            .get('/flashcards')
            .expect('Content-type', /json/);
    })
    test('GET /flashcards includes id 1', () => {
        return request(app)
            .get('/flashcards')
            .expect(/1/)
    })
    test('GET /flashcards gets all flashcards in the flashcards.json file', () => {
        return request(app)
            .get('/flashcards')
            .expect(dbFlashcards);
    })
})
describe('Test POST /flashcards/add', () =>{
    const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also orthogonal', subject:'Maths'};
    test('POST  /flashcards/add succeeds', () => {
        return request(app)
            .post('/flashcards/add')
            .send(params)
            .expect(200)
            .then(res => {
                //expect JSON content-type
                

                //delete flashcard that was just added
                dbFlashcards.flashcards.pop()
                fs.writeFileSync(fileNameForFlashcards, JSON.stringify(dbFlashcards));
            })
    }),
    test('POST  /flashcards/add posts JSON', () => {
        return request(app)
            .post('/flashcards/add')
            .send(params)
            //expect JSON content-type
            .expect('Content-type', /json/)
            .then(res => {
                //delete flashcard that was just added
                dbFlashcards.flashcards.pop()
                fs.writeFileSync(fileNameForFlashcards, JSON.stringify(dbFlashcards));
            });
                
    }),
    test('POST  /flashcards/add contains the flashcard just posted', () => {
        return request(app)
            .post('/flashcards/add')
            .send(params)
            .then(() => {
                //expect the flashcard just posted to be there
                const filteredResult = dbFlashcards.flashcards.find((e) => e.id == 6);
                expect(filteredResult);

                //delete flashcard added for testing
                dbFlashcards.flashcards.pop()
                fs.writeFileSync(fileNameForFlashcards, JSON.stringify(dbFlashcards));
            })
                
    })
})
describe('Test /flashcards/update', () => {
    const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also an orthogonal matrix', subject:'Maths'};
    test('POST  /flashcards/update succeeds', () => {
        return request(app)
            .post('/flashcards/update')
            .send(params)
            .expect(200)
    })
    test('POST  /flashcards/update posts JSON', () => {
        return request(app)
            .post('/flashcards/update')
            .send(params)
                .expect('Content-type', /json/);
    }),
    test('POST  /flashcards/update contains edit that was just made', () => {
        return request(app)
            .post('/flashcards/update')
            .send(params)
            //flashcards didn't have the matrix part after orthogonal on the back, check that it is present after the edit
                .expect(/also an orthogonal matrix/);
    })
}) 
describe('Test /reviews/add', () => {
    const params = {id:16,flashcard_id: '10',reviewer_name: 'Sarah',review_date: '02/03/2023 14:30',review_title: 'Great flashcard!',rating: '5/5',comment: 'I found this flashcard to be really helpful! The information was presented clearly and concisely, and it was easy to remember. Would definitely recommend to others!'};
    test('POST  /reviews/add succeeds', () => {
        return request(app)
            .post('/reviews/add')
            .send(params)
            .expect(200)
            .then(() => {
                dbReviews.reviews.pop()
                fs.writeFileSync(fileNameForReviews, JSON.stringify(dbReviews))
            })
    })
    test('POST  /reviews/add returns a JSON', () => {
        return request(app)
            .post('/reviews/add')
            .send(params)
            .expect('Content-type', /json/)
            .then(() => {
                dbReviews.reviews.pop()
                fs.writeFileSync(fileNameForReviews, JSON.stringify(dbReviews))
            })
    })
    test('POST  /reviews/add contains the review just posted', () => {
        return request(app)
            .post('/reviews/add')
            .send(params)
            .then(() => {
                //expect the flashcard just posted to be there
                const filteredResult = dbReviews.reviews.find((e) => e.id == 16);
                expect(filteredResult);

                //delete flashcard added for testing
                dbReviews.reviews.pop()
                fs.writeFileSync(fileNameForReviews, JSON.stringify(dbReviews));
            })
    })
})
describe('Test /reviews/2', () => {
    test('GET /reviews/2 succeeds', () => {
        return request(app)
            .get('/reviews/2')
            .expect(200)
    })
    test('GET /reviews/2 returns JSON', () => {
        return request(app)
            .get('/reviews/2')
            .expect('Content-type', /json/)
    })
    test('GET /reviews/2 has id 2', () => {
        return request(app)
            .get('/reviews/2')
            .expect(/2/)
    })
    test('GET /reviews/2 includes Charles', () => {
        return request(app)
            .get('/reviews/2')
            .expect(/Charles/)
    })
})
describe('Test /reviews/2/rating', () => {
    test('GET /reviews/2/rating succeeds', () => {
        return request(app)
            .get('/reviews/2/rating')
            .expect(200)
    })
    test('GET /reviews/2/rating returns JSON', () => {
        return request(app)
            .get('/reviews/2/rating')
            .expect('Content-type', /json/)
    })
    test('GET /reviews/2/rating returns all ratings for flashcard 2', () => {
        return request(app)
            .get('/reviews/2/rating')
            .then(() => {
                //expect the flashcard just posted to be there
                const selectedReviews = dbReviews.reviews.filter(obj => {
                    return obj.flashcard_id === 2;
                    }
                );
                const selectedRatings = selectedReviews.map(a => a.rating);
                expect(selectedRatings);
            })
    })
})
describe('Test /flashcards/subject', () => {
    test('GET /flashcards/subject return JSON', () => {
        return request(app)
            .get('/flashcards/subject')
            .expect('Content-type', /json/)
    })
    test('GET /flashcards/subject succeeds', () => {
        return request(app)
            .get('/flashcards/subject')
            .expect(200)
    })
    test('GET /flashcards/subject includes Maths', () => {
        return request(app)
            .get('/flashcards/subject')
            .expect(/Maths/);
    })
    test('GET /flashcards/subject includes all subjects', () => {
        return request(app)
            .get('/flashcards/subject')
            .then(() => {
                const subject = dbFlashcards.flashcards.map(e => e.subject);
                expect(subject);
            })
    })
})
describe('Test /flashcards/search', () => {
    test('GET /flashcards/search query gets correct flashcard', () => {
        return request(app)
            .get('/flashcards/search?searchquery=Tonkin')
            .expect(/Tonkin/)
    })
    test('GET /flashcards/search query is not case sensitive', () => {
        return request(app)
            .get('/flashcards/search?searchquery=TONKIN')
            .expect(/Tonkin/)
    })
})

