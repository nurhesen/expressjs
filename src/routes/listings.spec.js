"use strict";

const request = require("supertest");
const { v4: uuid } = require("uuid");
const app = require("../app");
const listingService = require("../services/listings");
const { mockAuthentication } = require("../tests");
const listingsRouter = require("./listings");
const errorHandler = require("./middlewares/errorHandler");

jest.mock("../services/listings");

describe("routes/listings", () => {
  app.use([mockAuthentication, listingsRouter, errorHandler]);

  beforeEach(() => {
    listingService.saveListing.mockReset();
    listingService.getListings.mockReset();
    listingService.getListingById.mockReset();
  });

  const listingProps = {
    id: uuid(),
    listingType: "SELL",
    currency: "btc",
    amount: "100",
    minLimit: "23",
    maxLimit: "50",
    paymentCurrency: "USDZ",
    price: "1",
    paymentWindow: "600",
    description: "Selling Bitcoins for USDC at a good price",
  };

  describe("PUT /:id", () => {
    it("should successfully create a listing and return status 201", async () => {
      // Given
      listingService.saveListing.mockResolvedValue(listingProps);

      // When
      const response = await request(app)
        .put(`/${listingProps.id}`)
        .send(listingProps);

      // Then
      expect(response.status).toBe(201);
      expect(response.body).toEqual(listingProps);
      expect(listingService.saveListing.mock.calls.length).toBe(1);
    });

    it("should successfully update a listing and return status 200", async () => {
      // Given
      const createdAt = new Date();
      const updatedAt = new Date(createdAt.getTime() + 3600 * 1000);
      const listingToUpdateProps = {
        ...listingProps,
        createdAt: createdAt.toJSON(),
        updatedAt: updatedAt.toJSON(),
      };
      listingService.saveListing.mockResolvedValue(listingToUpdateProps);

      // When
      const response = await request(app)
        .put(`/${listingToUpdateProps.id}`)
        .send(listingToUpdateProps);

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(listingToUpdateProps);
      expect(listingService.saveListing.mock.calls.length).toBe(1);
    });
  });

  describe("GET /listings", () => {
    const listings = [
      {
        id: "6e3d62c2-c4d4-4dad-81a6-f9e187de5f7d",
        listingType: "SELL",
        currency: "btc",
        amount: "120",
        minLimit: "23",
        maxLimit: "50",
        paymentCurrency: "USDZ",
        price: "1",
        paymentWindow: "600",
        description: "Selling Bitcoins for USDC at a good price",
      },
    ];

    it("should get listings list", async () => {
      //Given
      listingService.getListings.mockResolvedValue(listings);

      //When
      const response = await request(app).get("/");

      //Then
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(listingService.getListings.mock.calls.length).toBe(1);
    });
  });

  describe("GET /listings/:id", () => {
    const listing = {
      id: "6e3d62c2-c4d4-4dad-81a6-f9e187de5f7d",
      listingType: "SELL",
      currency: "btc",
      amount: "120",
      minLimit: "23",
      maxLimit: "50",
      paymentCurrency: "USDZ",
      price: "1",
      paymentWindow: "600",
      description: "Selling Bitcoins for USDC at a good price",
    };

    it("should get listing", async () => {
      //Given
      listingService.getListingById.mockResolvedValue(listing);
      const id = "6e3d62c2-c4d4-4dad-81a6-f9e187de5f7d";

      //When
      const response = await request(app).get(`/${id}`);

      //Then
      expect(response.status).toBe(200);
      expect(listingService.getListingById.mock.calls.length).toBe(1);
    });
  });
});
