"use strict";

const { resetDb } = require("../../scripts/common");

exports.setupIntegrationTest = () => {
  const sequelize = require("../lib/db")();
  beforeEach(resetDb);
  afterAll(() => sequelize.close());
};

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmOTQ3NmEyLWY4MjYtNGI3NC1hYmFmLWQ0OWQ5ZWM2YTAwNCIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.EKLBTa4CizTe7r1gpc75rZtJX0c-RF1Mk46wIsYT8i4";
exports.jwt = jwt;

const jwtPayload = {
  id: "3f9476a2-f826-4b74-abaf-d49d9ec6a004",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@mail.com",
  iat: 1516239022,
};
exports.jwtPayload = jwtPayload;

exports.mockAuthentication = (req, res, next) => {
  req.headers = {
    authorization: `Bearer ${jwt}`,
  };
  req.auth = jwtPayload;
  next();
};
