const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ⭐ MUST be BEFORE anything using :id
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ⭐ INDEX + CREATE
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ⭐ SHOW LISTING
router.get("/:id", wrapAsync(listingController.showListing));

// ⭐ EDIT
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

// ⭐ UPDATE
router.put("/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

// ⭐ DELETE
router.delete("/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
