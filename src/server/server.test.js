const request = require("supertest");
const app = require('./server');

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
});

describe('GET /all ', () => {
  test('It should respond', async () => {
    const response = await request(app).get('/all');
    expect(response.req.path).toBe('/all');
    expect(response.statusCode).toBe(200);
  });
});
