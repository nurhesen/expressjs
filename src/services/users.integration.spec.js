"use strict";

const User = require("../models/user");
const { setupIntegrationTest } = require("../tests");
const { registerUser } = require("./users");

describe("/service/users", () => {
  setupIntegrationTest();

  const userProps = {
    id: "93207eb6-fc35-4ad0-8ad5-570c0d5b9aa5",
    email: "user2@email.com",
    password: "aaaaaA12334",
    username: "NewUser",
    firstName: "firstName",
    lastName: "User",
  };

  describe("registerUser()", () => {
    it("should successfully register a new user", async () => {
      // When
      const newUser = await registerUser(userProps);

      // Then
      const registeredUser = await User.findOne({
        where: { id: userProps.id },
      });

      expect(registeredUser).toMatchObject({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    });

    it("should return null if username, email or id exists in db", async () => {
      // Given
      const existingUserProps = {
        ...userProps,
        id: "a0d91742-8c76-416e-801a-6ca9c33eb24a",
      };

      // When
      const result = await registerUser(existingUserProps);
      // Then
      expect(result).toBeNull();
    });
  });
});
