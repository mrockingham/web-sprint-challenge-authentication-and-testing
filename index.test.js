const request = require('supertest')
const server = require('./index').server

it('Test for the get api',  (done)=>{
    request(server).get('/').expect('hello world').end(done)
})

module.exports