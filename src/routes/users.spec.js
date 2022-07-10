"use strict";

const request = require("supertest");
const { v4: uuid } = require("uuid");
const app = require("../app");
const usersService = require("../services/users");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./users");

jest.mock("../services/users");

describe("routes/users", () => {
  app.use([usersRouter, errorHandler]);

  beforeEach(() => {
    usersService.registerUser.mockReset();
  });

  describe("PUT /:id", () => {
    const newUserRegistration = {
      id: uuid(),
      email: "some.user@email.com",
      password: "myPASSword123$",
      username: "someuser",
      firstName: "Some1234",
      lastName: "User1233",
    };

    it("should create user and return 201 status code", async () => {
      // Given
      const { password, ...newUser } = newUserRegistration;
      usersService.registerUser.mockResolvedValue(newUser);

      // When
      const response = await request(app)
        .put(`/${newUserRegistration.id}`)
        .send(newUserRegistration);

      // Then
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newUser);
      expect(usersService.registerUser.mock.calls.length).toBe(1);
    });

    it("should return 409 for existing user (id,email or username)", async () => {
      // Given
      usersService.registerUser.mockResolvedValue(null);

      // When
      const response = await request(app)
        .put(`/${newUserRegistration.id}`)
        .send(newUserRegistration);

      // Then
      expect(response.statusCode).toBe(409);
      expect(usersService.registerUser.mock.calls.length).toBe(1);
    });
  });
});
