// Load environment variables from .env file only in development
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Core packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Middleware & utilities
const methodOverride = require("method-override"); // Allows PUT/DELETE via forms
const ejsMate = require("ejs-mate");               // Layout support for EJS
const ExpressError = require("./utils/ExpressError.js");

// Session & authentication related
const session = require("express-session");
const MongoStore = require("connect-mongo").default; // Store sessions in MongoDB
const flash = require("connect-flash");              // Flash messages
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Route imports
const userRouter = require("./routes/user.js");
const listingRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");

// MongoDB connection URL from environment variables
const dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
async function main() {
  await mongoose.connect(dbUrl);
}

// Start application only after DB connection
main()
  .then(() => {
    console.log("Connected to DB");

    // View engine setup
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.engine("ejs", ejsMate);

    // Middleware for parsing form data
    app.use(express.urlencoded({ extended: true }));

    // Enable HTTP method override (?_method=PUT / DELETE)
    app.use(methodOverride("_method"));

    // Serve static files (CSS, JS, images)
    app.use(express.static(path.join(__dirname, "/public")));

    // MongoDB-backed session store
    const store = new MongoStore({
      mongoUrl: dbUrl,
      crypto: {
        secret: process.env.SECRET, // Encrypt session data
      },
      touchAfter: 24 * 3600, // Reduce session write frequency (1 day)
    });

    // Handle session store errors
    store.on("error", (err) => {
      console.log("Error in Mongo session store", err);
    });

    // Session configuration
    const sessionOptions = {
      store,
      secret: process.env.SECRET,
      resave: false,            // Don't resave unchanged sessions
      saveUninitialized: true,  // Save new but unmodified sessions
      cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevent client-side JS access
      },
    };

    // Enable sessions & flash messages
    app.use(session(sessionOptions));
    app.use(flash());

    // Passport authentication setup
    app.use(passport.initialize());
    app.use(passport.session());

    // Use passport-local strategy with User model
    passport.use(new LocalStrategy(User.authenticate()));

    // Store user data in session
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Middleware to make flash messages & current user available in all views
    app.use((req, res, next) => {
      res.locals.success = req.flash("success");
      res.locals.error = req.flash("error");
      res.locals.currUser = req.user;
      next();
    });

    // Route handlers
    app.use("/listings", listingRouter);
    app.use("/listings/:id/reviews", reviewsRouter);
    app.use("/", userRouter);

    // Catch-all route for undefined paths (404)
    // Using regex instead of "*" for Express 5 compatibility
    app.all(/(.*)/, (req, res, next) => {
      next(new ExpressError(404, "Page Not Found!"));
    });

    // Global error-handling middleware
    app.use((err, req, res, next) => {
      let { statusCode = 500, message = "Something went wrong!" } = err;
      res.status(statusCode).render("./listings/error.ejs", { message });
    });

    // Start server
    app.listen(8080, () => {
      console.log("Server is listening on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1); // Exit if DB connection fails
  });
