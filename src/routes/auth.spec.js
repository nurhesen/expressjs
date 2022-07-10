"use strict";
const request = require("supertest");

const app = require("../app");
const { login } = require("../services/auth");
const { mockAuthentication } = require("../tests");
const authRouter = require("./auth");
const errorHandler = require("./middlewares/errorHandler");
jest.mock("../services/auth");

const user = {
  email: "some.user@email.com",
  password: "mypasswd3@Asadsa",
};
const accessToken = "some token";
describe("routes/authRoutes", () => {
  app.use([mockAuthentication, authRouter, errorHandler]);

  describe("POST /login", () => {
    it("should return accessToken", async () => {
      //Given
      login.mockResolvedValue({
        accessToken: accessToken,
      });
      //When
      const res = await request(app).post("/login").send(user);
      //Then
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ accessToken });
    });

    it("should return 401 if user login fails", async () => {
      //Given
      login.mockResolvedValue(null);
      //When
      const res = await request(app).post("/login").send(user);
      //Then
      expect(res.status).toBe(401);
    });
  });
});
