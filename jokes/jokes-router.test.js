const request = require('supertest')
const server = require('./jokes-router').server

it('Test for the get for jokes api',  (done)=>{
    request(server).get('/jokes')
    .expect('200')
    .expect('response.data.results')
    .end(done)
})

module.exports