'use-strict';

const request = require('supertest');
const app = require('./app');

describe('Test the flashcards and reviews service', () => {
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
    test('POST  /flashcards/add', () => {
        const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also orthogonal', subject:'Maths'};
        return request(app)
            .post('/flashcards/add')
            .send(params)
                .expect(200);
    }),
    test('POST  /flashcards/add posts JSON', () => {
        const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also orthogonal', subject:'Maths'};
        return request(app)
            .post('/flashcards/add')
            .send(params)
                .expect('Content-type', /json/);
    })
    test('POST  /flashcards/update', () => {
        const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also an orthogonal matrix', subject:'Maths'};
        return request(app)
            .post('/flashcards/update')
            .send(params)
                .expect(200);
    })
    test('POST  /flashcards/update posts JSON', () => {
        const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also an orthogonal matrix', subject:'Maths'};
        return request(app)
            .post('/flashcards/update')
            .send(params)
                .expect('Content-type', /json/);
    })
    test('POST  /reviews/add', () => {
        const params = {id:9,flashcard_id: '10',reviewer_name: 'Sarah',review_date: '02/03/2023 14:30',review_title: 'Great flashcard!',rating: '5/5',comment: 'I found this flashcard to be really helpful! The information was presented clearly and concisely, and it was easy to remember. Would definitely recommend to others!'};
        return request(app)
            .post('/reviews/add')
            .send(params)
                .expect('Content-type', /json/);
    })
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
    test('GET /reviews/2 includes Charles', () => {
        return request(app)
            .get('/reviews/2')
            .expect(/Charles/)
    })
    test('GET /flashcards includes id 1', () => {
        return request(app)
            .get('/flashcards')
            .expect(/1/)
    })
    test('GET /flashcards/search query gets correct flashcard', () => {
        return request(app)
            .get('/flashcards/search?searchquery=Tonkin')
            .expect(/Tonkin/)
    })
    test('GET /flashcards/search query is not case sensitive', () => {
        return request(app)
            .get('/flashcards/search?searchquery=tonkin')
            .expect(/Tonkin/)
    })
})