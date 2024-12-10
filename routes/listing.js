const express = require("express");
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({storage})


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn , upload.single('listing[image]'), validateListing,wrapAsync(listingController.createListing));



// new route 3
router.get("/new",isLoggedIn , listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn ,isOwner,upload.single('listing[image]'), validateListing,   wrapAsync(listingController.updateListing))
.delete(isLoggedIn ,isOwner, wrapAsync(listingController.destroyListing))

// edit route 5
router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync(listingController.editForm))


module.exports = router;