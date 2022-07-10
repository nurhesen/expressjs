"use strict";

const { ValidationError } = require("joi");
const { registerUserSchema } = require("./user");

describe("schemas/user", () => {
  const registerUserProps = {
    email: "some.user@email.com",
    password: "mypassW14$orDf",
    username: "someuser",
    firstName: "Some1234",
    lastName: "User1233",
  };

  describe("registerUserSchema", () => {
    it("should validate the schema successfully", () => {
      // Given
      const validUserRegistration = {
        ...registerUserProps,
        id: "93207eb6-fc35-4ad0-8ad5-570c0d5b9aa5",
      };

      // When
      const res = registerUserSchema.validateAsync(validUserRegistration, {
        abortEarly: false,
      });

      // Then
      expect(res).resolves.toEqual(validUserRegistration);
    });

    it("should fail validating the schema due to invalid or lacking props", async () => {
      // When
      const res = registerUserSchema.validateAsync(registerUserProps, {
        abortEarly: false,
      });

      // Then
      expect(res).rejects.toThrow(ValidationError);
    });
  });
});
