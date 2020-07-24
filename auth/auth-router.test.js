const db = require('../database/dbConfig')

const Users = require('../users/userModel')


describe("environment", function () {
    it("should be using the testing database", function () {
        expect(process.env.DB_ENV).toBe("testing");
    });
});

describe("Users model", function () {
    describe("add()", function () {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("should insert users into database", async () => {
            // table was cleared by the beforeEach() function
            await Users.add({ username: "mom", password: 'password' });
            await Users.add({ username: "dad", password: 'password' });
            await Users.add({ username: "son"});

            const users = await db("users");

            expect(users).toHaveLength(2);
        });
    });
});

describe("Users model", function () {
    describe("add()", function () {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("should insert users into database", async () => {
            // table was cleared by the beforeEach() function
           
            await Users.add({ username: "son"});

            const users = await db("users");

            expect(users).toHaveLength(2);
        });
    });
});
