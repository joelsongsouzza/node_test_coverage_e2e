const { describe, it } = require("mocha")
const request = require("supertest");
const app = require("./api")
const assert = require("assert");

describe("API Suit test", () => {
  describe("/contact", () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app).get('/contact').expect(200)
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe("/hello", () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi').expect(200)
      assert.deepStrictEqual(response.text, 'Hello World!')
    })
  })

  describe("/login", () => {
    it('should login succesfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: "joelsongsouzza", password: "mytestpassword" })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Login has succeeded!')
    })

    it('should send wrong login inputs and return error message', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: "kaleu", password: "myanotherpassword" })
        .expect(401)

      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })
})