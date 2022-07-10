"use strict";

const Listing = require("./../models/listing");
const { getListings } = require("./listings");
jest.mock("./../models/listing");

describe("services/listings", () => {
  beforeEach(() => {
    Listing.findAll.mockReset();
  });

  describe("getListings()", () => {
    it("should filter", async () => {
      //Given
      const currency = "btc";
      //When
      await getListings({ currency });
      //Then
      expect(Listing.findAll).toBeCalledWith({
        where: { currency },
      });
    });

    it("should not filter", async () => {
      //When
      await getListings();
      //Then
      expect(Listing.findAll).toBeCalledWith({});
    });

    it("should only apply allowed filters", async () => {
      //Given
      const filter = { custom: "bla bla" };
      //When
      await getListings(filter);
      //Then
      expect(Listing.findAll).toBeCalledWith({});
    });
  });
});
