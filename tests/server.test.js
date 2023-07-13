const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const dbConfig = require('../config/db.config');

require("dotenv").config();
const port = process.env.PORT || 8080;

/* Start the server before test */
beforeEach(async () => {
    await mongoose
        .connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.log('Cannot connect to the database!', err);
            process.exit();
        });
});

/* Close the server after each test */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('GET /views', () => {
    it('should return recipes view', async () => {
        const res = await request(app).get("/views");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
