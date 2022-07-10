"use strict";
const { v4: uuid } = require("uuid");
const Listing = require("../models/listing");
const { ValidationError } = require("sequelize");
const { setupIntegrationTest } = require("../tests");
const { getListings, getListingById, saveListing } = require("./listings");
const { LISTING_TYPE } = require("../lib/enums");

describe("services/listing", () => {
  setupIntegrationTest();

  const listingProps = {
    userId: "35d26914-16db-4f90-9b8d-15ca1c108cab",
    listingType: "SELL",
    currency: "btc",
    amount: "100",
    minLimit: "23",
    maxLimit: "50",
    paymentCurrency: "USDZ",
    price: "1",
    paymentWindow: 600,
    description: "Selling Bitcoins for USDC at a good price",
  };

  describe("saveListing()", () => {
    it("should create new listing", async () => {
      // Given
      const newListingProps = {
        ...listingProps,
        id: uuid(),
      };

      // When
      const newListing = await saveListing(newListingProps);

      // Then
      const savedListing = await Listing.findOne({
        where: { id: newListing.id },
      });
      expect(savedListing).toMatchObject(newListingProps);
      expect(newListing.createdAt).toEqual(newListing.updatedAt);
    });

    it("should update an existing listing", async () => {
      // Given
      const listingToUpdateProps = {
        ...listingProps,
        id: "83a3d577-312c-430a-bea2-7024e9225db9",
        amount: "125",
      };

      // When
      const listingToUpdate = await saveListing(listingToUpdateProps);

      // Then
      const updatedListing = await Listing.findOne({
        where: { id: listingToUpdateProps.id },
      });
      expect(updatedListing).toMatchObject(listingToUpdateProps);
      expect(listingToUpdate.createdAt).not.toEqual(listingToUpdate.updatedAt);
    });

    it("should throw validation error when props are invalid", async () => {
      // Given
      const incompleteListingProps = { id: uuid() };

      // When
      const listing = saveListing(incompleteListingProps);

      // Then
      expect(listing).rejects.toThrow(ValidationError);
    });
  });

  describe("getListings()", () => {
    it("should get listings list", async () => {
      //When
      const listings = await getListings();
      //Then
      expect(Array.isArray(listings)).toBeTruthy();
      expect(listings.length).toBe(1);
      expect(listings[0].dataValues).toContainKeys([
        "id",
        "userId",
        "listingType",
        "currency",
        "amount",
        "minLimit",
        "maxLimit",
        "paymentCurrency",
        "price",
      ]);
    });

    it("should return listings matching the given filter", async () => {
      //When
      const listings = await getListings({ listingType: LISTING_TYPE.SELL });
      //Then
      expect(Array.isArray(listings)).toBeTruthy();
      expect(
        listings.every((listing) => listing.listingType === LISTING_TYPE.SELL)
      ).toBeTruthy();
    });

    it("should return no listings if they don't match the given filter", async () => {
      //When
      const listings = await getListings({ currency: "bla bla" });
      //Then
      expect(Array.isArray(listings)).toBeTruthy();
      expect(listings.length).toBe(0);
    });
  });

  describe("getListingById()", () => {
    it("should get listing", async () => {
      //Given
      const id = "83a3d577-312c-430a-bea2-7024e9225db9";

      //When
      const listing = await getListingById(id);

      //Then
      expect(listing.dataValues).toContainKeys([
        "id",
        "userId",
        "listingType",
        "currency",
        "amount",
        "minLimit",
        "maxLimit",
        "paymentCurrency",
        "price",
      ]);
      expect(listing.id).toBe(id);
    });

    it("should get undefined when id is incorrect", async () => {
      //Given
      const id = "123";

      //When
      const listing = await getListingById(id);

      //Then
      expect(listing).toBe(null);
    });
  });
});
