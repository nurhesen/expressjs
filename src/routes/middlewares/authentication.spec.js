"use strict";

const { jwt, jwtPayload } = require("../../tests");
const authentication = require("./authentication");

describe("middlewares/authentication", () => {
  const req = {};

  beforeEach(() => {
    req.headers = {};
    delete req.auth;
  });

  it("should succeed when JWT is present in request header", (done) => {
    // Given
    req.headers["Authorization"] = `Bearer ${jwt}`;

    // When
    authentication(req, {}, (err) => {
      try {
        // Then
        expect(err).toBe(undefined);
        expect(req.auth).toEqual(jwtPayload);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it("should fail when there is no JWT in request header", (done) => {
    // When
    authentication(req, {}, (err) => {
      try {
        // Then
        expect(err).toBeTruthy();
        expect(req.auth).toBe(undefined);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it("should fail when JWT is invalid", (done) => {
    // Given
    const invalidJwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmOTQ3NmEyLWY4MjYtNGI3NC1hYmFmLWQ0OWQ5ZWM2YTAwNCIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.32d2pAlNUfs9_IN8kMyHWzKgflMBqFTIiTs3ud0GVc8";

    req.headers["Authorization"] = `Bearer ${invalidJwt}`;

    // When
    authentication(req, {}, (err) => {
      try {
        // Then
        expect(err).toBeTruthy();
        expect(req.auth).toBe(undefined);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
