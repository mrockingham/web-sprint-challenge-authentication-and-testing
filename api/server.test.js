const supertest = require("supertest");

const server = require("./server.js");
const db = require('../database/dbConfig');
const { response } = require("./server.js");

describe("server test", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("GET /", function () {
        it("should respond with 200 OK", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should respond with JSON", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should respond with api: 'server is up'", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.body).toBe("server is up");
                });
        });


        describe("Users model", function () {
            describe("add()", function () {
                beforeEach(async () => {
                    await db("users").truncate();
                });
                    ///Post Register test


                it('post register /register shold return status 201 code', () =>{
                    return supertest(server)
                    .post('/api/auth/register')
                    .send({username: 'mikey', password: 'password'})
                    .then(res => {
                        expect(res.status).toBe(201)
                    })
                })
                it('post register /register shold return status 201 code', () =>{
                    return supertest(server)
                    .post('/api/auth/register')
                    .send({username: 'mikey'})
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
                })
                 ///Post Login test

                 it('post login without token', () =>{
                    return supertest(server)
                    .post('/api/auth/login')
                    .send({username: 'michael', password: 'password'})
                    .then(res => {
                        expect(res.status).toBe(401)
                    })
                })
                it('post login /register should return status 201 code missing user or password', () =>{
                    return supertest(server)
                    .post('/api/auth/login')
                    .send({username: 'mikey'})
                    .then(res => {
                        expect(res.status).toBe(400)
                    })
                })

                ///Get Jokes test

                it(' get jokes should return 200',() =>{
                    return supertest(server)
                    .get('/api/jokes')
                    .then(response=>{
                        expect(response.type).toMatch(/json/i)
                    })
                })
                it(' get jokes should return 200',() =>{
                    return supertest(server)
                    .get('/')
                    .then(response=>{
                        expect(response.status).toBe(200)
                    })
                })
                
    });
});
});
});