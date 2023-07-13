const request = require('supertest');
const app = require('../app');



describe('GET /api/categories', () => {
  it('should return a list of categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});
