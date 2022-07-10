"use strict";
const { hashPassword, generateToken } = require("./auth");

describe("utils/auth", () => {
  // Given
  let password = "mypass";
  let passwordHash =
    "5791e4e774951531018acae08b91dc2cabc5525efe33431a7bb8d95420f4e76b10bd70facc02ae82b311eed2612e33ec51ad04648740737e86858eb249d4a1da";
  const user_data = {
    id: "20b1d6e3-fded-4462-97b1-849f4e507836",
    email: "jane@gmail.com",
    username: "jane",
    password: password,
    firstName: "Jane",
    lastName: "Jane",
  };
  describe("hashPassword()", () => {
    it("should return a hash of a given password", () => {
      //When
      const newlyCreatedHash = hashPassword(password);
      //Then
      expect(newlyCreatedHash).toBe(passwordHash);
    });

    it("should return null if the password is null", () => {
      //When
      const newlyCreatedHash = hashPassword(null);
      //Then
      expect(newlyCreatedHash).toBe(null);
    });
  });
  describe("generateToken()", () => {
    it("should return a token with user data in the payload", () => {
      //When
      const token = generateToken(user_data);
      //Then
      expect(token).toBeTruthy();
    });
  });
});
