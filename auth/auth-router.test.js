const {MongoClient} = require('mongodb');
const router = require('../index')

let suptertest = require('supertest')
let authRouter = require('./auth-router')

describe("POST /login flow", () => {

    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
      });
      db = await connection.db(global.__MONGO_DB_NAME__);
    });
  
    afterAll(async () => {
      await connection.close();
      await db.close();
    });
  
    it('should return status 200 OK', async () => {
        let user = {
            username: "legacy",
            password: "mypw"
        }
        return  await supertest(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                // console.log(res.body, 'asdfasdf')
                // console.log(res.status)
                expect(res.status).toBe(201);
                // expect(res.body.data.username).toBe(user.username)
            })
    })
})
