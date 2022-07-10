"use strict";
const router = require("express").Router();
const validateSchema = require("./middlewares/validateSchema");
const { listingSaveSchema } = require("./../schemas/listing");
const {
  saveListing,
  getListingById,
  getListings,
} = require("./../services/listings");
const validateBodyIdMatchesParam = require("./middlewares/validateBodyIdMatchesParam");

router.get("/", (req, res, next) => {
  getListings(req.query)
    .then((listings) => res.status(200).json(listings))
    .catch(next);
});

router.put(
  "/:id",
  validateSchema(listingSaveSchema),
  validateBodyIdMatchesParam("id"),
  (req, res, next) => {
    const listingProps = {
      ...req.body,
      userId: req.auth.id,
    };

    saveListing(listingProps)
      .then((listing) => {
        res
          .status(listing.createdAt === listing.updatedAt ? 201 : 200)
          .json(listing);
      })
      .catch(next);
  }
);
router.get("/:id", (req, res, next) => {
  getListingById(req.params.id)
    .then((listing) => {
      if (!listing) {
        return next({
          status: 404,
        });
      }

      res.status(200).json(listing);
    })
    .catch(next);
});

module.exports = router;
