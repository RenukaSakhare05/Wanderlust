const Listing = require("../models/listing");

// ⭐ INDEX
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// ⭐ NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// ⭐ SHOW LISTING
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// ⭐ CREATE LISTING — WITH CLOUDINARY IMAGE
module.exports.createListing = async (req, res) => {

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

 // Cloudinary file
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// ⭐ EDIT LISTING
module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

// ⭐ UPDATE LISTING — WITH IMAGE UPDATE
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (req.file) {
    // Replace old image with new one
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await updatedListing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// ⭐ DELETE LISTING
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
