const {MongoClient} = require('mongodb');
const request = require('supertest')
const router = require('express').Router();



describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.process.env.DB_CONNECT, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.mike);
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
    return  await request(server)
        .post('/api/auth/register')
        .send(user)
        .then(res => {
            // console.log(res.body, 'asdfasdf')
            // console.log(res.status)
            expect(res.status).toBe(201);
            // expect(res.body.data.username).toBe(user.username)
        })
})
  
});