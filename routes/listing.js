const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get(wrapAsync(listingController.index))  //Index Route
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);
// Major Project - 
router.get("/", wrapAsync(async (req, res) => {
    let { category } = req.query;
    let allListing;
    
    if (category) {
        // If a category is selected, find only those listings
        allListing = await Listing.find({ category: category });
    } else {
        // Otherwise, find all listings
        allListing = await Listing.find({});
    }
    res.render("listings/index", { allListing });
}));

//New Route  (which should be before show route as it searches for id)
router.get("/new",isLoggedIn,listingController.renderNewForm);

// Major Project - Copy/routes/listing.js

// Search Route
router.get("/search", wrapAsync(async (req, res) => {
    let { q } = req.query; // Extract the search term from the URL
    
    // Find listings where the title or location matches the search term
    const allListing = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    // Reuse the index view to display filtered results
    if (allListing.length === 0) {
        req.flash("error", "No listings found matching your search.");
        return res.redirect("/listings");
    }
    
    res.render("listings/index.ejs", { allListing });
}));

router
.route("/:id")
.get(wrapAsync(listingController.showListing))   //Show Route
.put(                                           //update route
  isLoggedIn,
  upload.single('listing[image]'),
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)); //delete route

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));




module.exports=router;


