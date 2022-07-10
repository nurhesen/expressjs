"use strict";

const { ValidationError } = require("joi");
const { loginUserSchema } = require("./loginUser");

describe("schemas/loginUser", () => {
  const loginUserProps = {
    email: "some.user@email.com",
  };

  describe("loginUserSchema()", () => {
    it("should return the validated schema", () => {
      // Given
      const validUserLogin = {
        ...loginUserProps,
        password: "mypasswd3@Asadsa",
      };

      // When
      const res = loginUserSchema.validateAsync(validUserLogin, {
        abortEarly: false,
      });

      // Then
      expect(res).resolves.toEqual(validUserLogin);
    });

    it("should throw error from validating the schema", async () => {
      // When
      const res = loginUserSchema.validateAsync(loginUserProps, {
        abortEarly: false,
      });

      // Then
      expect(res).rejects.toThrow(ValidationError);
    });
  });
});
