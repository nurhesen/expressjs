"use strict";

const Listing = require("../models/listing");
const { LISTING_TYPE } = require("../lib/enums");

const saveListing = async (props) => {
  let listing = await Listing.findOne({ where: { id: props.id } });
  if (listing) {
    listing.set(props);
  } else {
    listing = Listing.build(props);
  }
  return listing.save();
};

const getListings = async (query) => {
  const filters = getFilters(query);
  return await Listing.findAll(filters);
};

const getListingById = async (id) => {
  return await Listing.findOne({ where: { id } });
};

const getFilters = (query) => {
  if (!query) {
    return {};
  }
  const allowedFilters = ["currency", "listingType"];
  const filtersToApply = Object.keys(query).filter((f) =>
    allowedFilters.includes(f)
  );
  const filters = filtersToApply.reduce((filtersIndex, filterName) => {
    filtersIndex[filterName] = query[filterName];
    return filtersIndex;
  }, {});
  return filtersToApply.length ? { where: filters } : {};
};

module.exports = {
  saveListing,
  getListings,
  getListingById,
};
