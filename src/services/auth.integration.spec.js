"use strict";

const { login } = require("./auth");
const { setupIntegrationTest } = require("../tests");

describe("services/auth", () => {
  setupIntegrationTest();

  describe("login()", () => {
    // Given

    const user = {
      id: "20b1d6e3-fded-4462-97b1-849f4e507836",
      email: "some.user@email.com",
      username: "jane",
      password: "welcome",
      firstName: "Jane",
      lastName: "Jane",
    };

    it("should return access token when user credentials are correct", async () => {
      // When
      const result = await login({
        email: user.email,
        password: user.password,
      });
      // Then
      expect(result.accessToken).toBeTruthy();
    });
    it("should return null when user credentials are incorrect", async () => {
      // When
      const result = await login({
        email: user.email,
        password: "Wrong one",
      });

      // Then
      expect(result).toBe(null);
    });
  });
});
