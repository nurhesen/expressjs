"use strict";

const validateBodyIdMatchesParam = require("./validateBodyIdMatchesParam");

describe("middleware/validateBodyIdMatchesParam", () => {
  //Given
  const id = "test";
  const req = {
    body: { id },
    params: { id, notId: "no" },
  };
  const res = {};

  it("should continue if body id matches param", (done) => {
    //When
    validateBodyIdMatchesParam("id")(req, res, (err) => {
      //Then
      expect(err).toBe(undefined);
      done();
    });
  });

  it("should 400 if body id does not match param", (done) => {
    //When
    validateBodyIdMatchesParam("notId")(req, res, (err) => {
      //Then
      expect(err).toHaveProperty("status", 400);
      done();
    });
  });
});
