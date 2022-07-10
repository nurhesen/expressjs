"use strict";

const { ValidationError } = require("sequelize");
const Listing = require("./listing");

describe("models/Listing", () => {
  describe("validate", () => {
    it("should throw validation error if data is invalid", async () => {
      // Given
      const listing = new Listing();

      // When
      const validation = listing.validate();

      // Then
      expect(validation).rejects.toThrow(ValidationError);
    });

    it("should return model itself if data is valid", () => {
      // Given
      const listing = new Listing({
        id: "20964016-a0f4-4122-9573-3caae64f8fa7",
        userId: "20964016-a0f4-4122-9573-3caae64f8fa6",
        listingType: "SELL",
        currency: "btc",
        amount: "100",
        minLimit: "23",
        maxLimit: "50",
        paymentCurrency: "USDZ",
        price: "1",
        paymentWindow: 600,
        description: "Selling Bitcoins for USDC at a good price",
      });

      // When
      const validation = listing.validate();

      // Then
      expect(validation).resolves.toBe(listing);
    });
  });
});
