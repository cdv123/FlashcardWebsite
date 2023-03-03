'use-strict';

const request = require('supertest');
const app = require('./app');

describe('Test the flashcards and reviews service', () => {
    test('GET  /flashcards succeeds', () => {
        return request(app)
            .get('/flashcards')
            .expect(200);
    })
    // test('GET  /flashcards returns JSON', () => {
    //     return request(app)
    //         .get('/flashcards')
    //         .expect('Content-type', /json/);
    // })
    // test('POST  /flashcards/add', () => {
    //     const params = {id: 6, date_of_creation: 'Fri Mar 03 2023 15:00:00 GMT+0000 (Greenwich Mean Time)', front:'What can be said about the inverse of an orthogonal matrix', back:'The inverse is also orthogonal', subject:'Maths'};
    //     return request(app)
    //         .post('/flashcards/add')
    //         .send(params)
    //             .expect(200);
    // })
})