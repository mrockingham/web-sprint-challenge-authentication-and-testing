const request = require('supertest')
const server = require('./auth-router').server

it('Test for the registar api',  (done)=>{
    request(server).post('/register')
    .expect('400')
    .end(done)
})


it('Test for the login api',  (done)=>{
    request(server).post('/login')
    .expect('400')
    .end(done)
})
module.exports