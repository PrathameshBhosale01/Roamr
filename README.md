# 🏡 Roamr - Travel Listing Web Application

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

*A full-stack travel listing platform for discovering and sharing unique accommodations*

[Features](#-features--functionality) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [📖 Project Introduction](#-project-introduction)
- [🏗️ MVC Architecture](#️-mvc-architecture)
- [✨ Features & Functionality](#-features--functionality)
- [🗄️ Database Design](#️-database-design)
- [📦 Packages Used](#-packages-used)
- [📁 Folder Structure](#-folder-structure)
- [🎓 What I Learned](#-what-i-learned)
- [🚀 Installation](#-installation)
- [🔮 Future Improvements](#-future-improvements)
- [📄 License](#-license)

---

## 📖 Project Introduction

**Roamr** is a comprehensive full-stack travel listing web application that enables users to explore, create, and manage travel property listings. Built with modern web technologies, it provides a seamless experience similar to platforms like Airbnb.

### 🎯 Purpose

The primary objectives of this project are to:

- 🌍 **Create a Platform** for users to share and discover unique travel accommodations worldwide
- 🏛️ **Demonstrate MVC Architecture** - A complete implementation of the Model-View-Controller design pattern
- 🔐 **Implement Authentication** - Secure user authentication and authorization
- ☁️ **Handle Cloud Storage** - File uploads with cloud-based image storage
- 🛡️ **Build RESTful APIs** - Proper error handling and HTTP best practices

### ✅ Key Highlights

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Secure authentication using Passport.js with session management |
| 📸 **Image Uploads** | Seamless image uploads via Multer and Cloudinary integration |
| ⭐ **Review System** | Users can leave ratings and reviews for listings |
| 🔒 **Authorization** | Middleware-protected routes ensuring secure operations |
| 🗺️ **Interactive Maps** | Leaflet.js with Geoapify API for location visualization |
| 💾 **Session Management** | MongoDB-backed sessions for scalability |
| 💬 **Flash Messages** | Real-time user feedback for all interactions |
| 📱 **Responsive Design** | Mobile-first UI built with Bootstrap 5 |

### 🖼️ Screenshots

<div align="center">
<img width="1890" height="913" alt="Screenshot 2026-02-10 154514" src="https://github.com/user-attachments/assets/e515f1f0-c1bd-489c-b636-5c747f89255f" />
</div>



---

## 🏗️ MVC Architecture

This project follows the **MVC (Model-View-Controller)** design pattern, ensuring clean separation of concerns and maintainable code.

### 📊 What is MVC?

<div align="center">

```mermaid
graph TB
    A[User Request] --> B[Router]
    B --> C[Controller]
    C --> D[Model]
    D --> E[(Database)]
    E --> D
    D --> C
    C --> F[View]
    F --> G[Response]
```

</div>

| Layer | Responsibility | Files in Project |
|-------|---------------|------------------|
| **Model** 🗄️ | Database schema and business logic | `models/user.js`, `models/listing.js`, `models/review.js` |
| **View** 🎨 | User interface (HTML templates) | `views/` folder with EJS templates |
| **Controller** 🎮 | Request handling, data processing | `controllers/listings.js`, `controllers/reviews.js`, `controllers/user.js` |

### 🔄 Request Flow in Roamr

```
┌─────────────────────┐
│   User Action       │
│   (Browser)         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Routes            │
│   (routes/*.js)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Middleware        │
│   (auth, validate)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Controller        │
│   (process logic)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Model             │
│   (MongoDB query)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   View              │
│   (EJS template)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Response          │
│   (HTML to Browser) │
└─────────────────────┘
```

### 📝 Detailed Breakdown

#### 1️⃣ Models (`models/`)

Models define the structure of data stored in MongoDB using Mongoose schemas.

**Example: Listing Model**

```javascript
// models/listing.js
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: { 
    url: String, 
    filename: String 
  },
  price: Number,
  location: String,
  country: String,
  review: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Review" 
  }],
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
});
```

**Key Models:**

- 👤 **User**: Stores user credentials (username, email, hashed password)
- 🏠 **Listing**: Stores property details (title, price, location, images, owner)
- ⭐ **Review**: Stores user reviews (rating, comment, author)

#### 2️⃣ Views (`views/`)

Views are EJS templates that render dynamic HTML.

**Structure:**

```
views/
├── layouts/
│   └── boilerplate.ejs       # Main layout with navbar/footer
├── listings/
│   ├── index.ejs             # All listings page
│   ├── show.ejs              # Single listing detail
│   ├── new.ejs               # Create listing form
│   └── edit.ejs              # Edit listing form
├── users/
│   ├── login.ejs             # Login page
│   └── signup.ejs            # Signup page
└── includes/
    ├── navbar.ejs            # Navigation bar
    ├── footer.ejs            # Footer
    └── flash.ejs             # Flash messages
```

#### 3️⃣ Controllers (`controllers/`)

Controllers contain the business logic and handle requests.

**Example: Listing Controller**

```javascript
// controllers/listings.js
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  res.render("./listings/show.ejs", { list });
};
```

**Controllers:**

- 📋 **listings.js**: Handles CRUD operations for listings
- ⭐ **reviews.js**: Handles creating and deleting reviews
- 👤 **user.js**: Handles signup, login, logout

#### 4️⃣ Routes (`routes/`)

Routes define the URL endpoints and connect them to controllers.

**Example: Listing Routes**

```javascript
// routes/listing.js
router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing))           // GET /listings/:id
  .put(
    isLoggedIn,
    upload.single("image"),
    wrapAsync(listingsController.updateListing)
  )                                                          // PUT /listings/:id
  .delete(isLoggedIn, wrapAsync(listingsController.deleteListing)); // DELETE /listings/:id
```



---

## ✨ Features & Functionality

### 1. 🔐 User Authentication

**How it works:**

- Uses **Passport.js** with `passport-local-mongoose` plugin
- Passwords hashed using **pbkdf2** algorithm
- Sessions stored in **MongoDB** using `connect-mongo`

**Authentication Flow:**

```
1. User submits signup form → POST /signup
2. Controller creates new User with User.register(user, password)
3. Password is automatically hashed and user is saved
4. User is logged in using req.login()
5. Session created and stored in MongoDB
```

**Code Example:**

```javascript
// controllers/user.js
module.exports.signup = async (req, res) => {
  let { username, email, password } = req.body;
  let user = new User({ email, username });
  let newUser = await User.register(user, password); // Hashes password
  req.login(newUser, (err) => {
    req.flash("success", "Successfully Logged In!");
    res.redirect("/listings");
  });
};
```

---

### 2. 📝 CRUD Operations for Listings

Complete **Create, Read, Update, Delete** functionality for travel listings.

| Operation | Route | Method | Description |
|-----------|-------|--------|-------------|
| **Create** | `/listings` | `POST` | Create new listing |
| **Read** | `/listings` | `GET` | View all listings |
| **Read** | `/listings/:id` | `GET` | View single listing |
| **Update** | `/listings/:id` | `PUT` | Edit listing |
| **Delete** | `/listings/:id` | `DELETE` | Delete listing |

**Authorization:** Only the owner of a listing can edit or delete it.

**Code Example:**

```javascript
// middleware.js - Authorization check
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
```

---

### 3. 📸 Image Upload (Multer + Cloudinary)

**Upload Flow:**

```
User selects image → Multer intercepts → Upload to Cloudinary → 
Get URL & filename → Save to MongoDB
```

**Configuration:**

```javascript
// cloudConfig.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "roamr",
    allowerdformats: ["png", "jpeg", "jpg"],
  },
});
```

**Usage in Route:**

```javascript
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingsController.createListing)
);
```

---

### 4. ⭐ Reviews System

**Users can:**
- Leave star ratings (1-5 stars)
- Write detailed comments
- Delete their own reviews

**Schema Relationship:**

```javascript
// models/listing.js
review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]

// models/review.js
author: { type: Schema.Types.ObjectId, ref: "User" }
```

**Populating Reviews:**

```javascript
const list = await Listing.findById(id)
  .populate({
    path: "review",
    populate: { path: "author" }, // Nested populate
  })
  .populate("owner");
```

---

### 5. 🔒 Authorization Middleware

**Purpose:** Prevent unauthorized users from performing restricted actions

**Implementation:**

```javascript
// middleware.js
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save intended URL
    req.flash("error", "You must login first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
```

---

### 6. 💬 Flash Messages

**Purpose:** Provide real-time feedback to users

**How it works:**

1. Controller sets flash message: `req.flash("success", "Listing created!")`
2. Middleware passes to views: `res.locals.success = req.flash("success")`
3. View displays it: `<%= success %>`

**Example:**

```javascript
// app.js
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
```

---

### 7. 🗺️ Interactive Maps

**Technology:** Leaflet.js + Geoapify Geocoding API

**Map Flow:**

```
Listing location → Geoapify API → Get coordinates → 
Leaflet.js → Display interactive map
```

**Features:**
- Geocoding location to coordinates
- Interactive map markers
- Fallback to default location (Mumbai)
- Zoom and pan controls

---

### 8. ⚠️ Error Handling

**Custom Error Class:**

```javascript
// utils/ExpressError.js
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
```

**Global Error Handler:**

```javascript
// app.js
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});
```

**Async Error Wrapper:**

```javascript
// utils/wrapAsync.js
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next); // Passes errors to global handler
  };
}
```

---

### 9. 🔄 Session Management

**Configuration:**

```javascript
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_API,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600, // Update session once per 24 hours
  }),
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevents XSS attacks
  },
};
```

**Benefits:**
- ✅ Persistent sessions across server restarts
- ✅ Scalable (stored in database, not memory)
- ✅ Secure with httpOnly cookies
- ✅ Automatic session expiration



---

## 🗄️ Database Design

### 📊 Collections

#### 1️⃣ User Collection

```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (required),
  password: String (hashed automatically)
}
```

#### 2️⃣ Listing Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  owner: ObjectId (ref: "User"),
  review: [ObjectId] (ref: "Review")
}
```

#### 3️⃣ Review Collection

```javascript
{
  _id: ObjectId,
  comment: String,
  rating: Number (1-5),
  createdAt: Date (default: Date.now),
  author: ObjectId (ref: "User")
}
```

---

### 🔗 Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
│                 │
│  - _id          │
│  - username     │
│  - email        │
│  - password     │
└────────┬────────┘
         │
         │ owns (1:M)
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│    Listing      │◄────────│     Review      │
│                 │  has    │                 │
│  - _id          │  (1:M)  │  - _id          │
│  - title        │         │  - rating       │
│  - description  │         │  - comment      │
│  - image        │         │  - createdAt    │
│  - price        │         │  - author       │
│  - location     │         └────────┬────────┘
│  - country      │                  │
│  - owner ───────┼──────────────────┘
│  - reviews[]    │         written by (M:1)
└─────────────────┘
```

### 📋 Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| **User → Listing** | One-to-Many | One user can create multiple listings |
| **User → Review** | One-to-Many | One user can write multiple reviews |
| **Listing → Review** | One-to-Many | One listing can have multiple reviews |

### 🎯 Why This Schema?

| Feature | Benefit |
|---------|---------|
| **Normalization** | Avoids data duplication |
| **Referential Integrity** | Uses ObjectId references for consistency |
| **Population** | Mongoose `populate()` replaces IDs with actual documents |
| **Scalability** | Easy to add new fields or relationships |

---

### 🔍 Example Queries

**Get listing with all reviews and review authors:**

```javascript
const listing = await Listing.findById(id)
  .populate({
    path: "review",
    populate: { path: "author" }, // Nested population
  })
  .populate("owner");
```

**Cascade Delete Reviews when Listing is deleted:**

```javascript
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});
```



---

## 📦 Tech Stack

### 🔧 Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^5.2.1 | Web application framework for Node.js |
| **mongoose** | ^8.9.5 | MongoDB object modeling and schema validation |
| **ejs** | ^3.1.10 | Embedded JavaScript templating engine |
| **ejs-mate** | ^4.0.0 | Layout and partial support for EJS |

---

### 🔐 Authentication & Security

| Package | Version | Purpose |
|---------|---------|---------|
| **passport** | ^0.7.0 | Authentication middleware for Node.js |
| **passport-local** | ^1.0.0 | Local username/password authentication strategy |
| **passport-local-mongoose** | ^8.0.0 | Mongoose plugin for simplified user authentication |
| **express-session** | ^1.18.2 | Session middleware for Express |
| **connect-mongo** | ^5.0.0 | MongoDB session store for production |
| **connect-flash** | ^0.1.1 | Flash message middleware |
| **cookie-parser** | ^1.4.7 | Parse Cookie header and populate req.cookies |

<details>
<summary><b>📘 How Authentication Works</b></summary>

```javascript
// 1. Configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 2. Protect routes with middleware
router.get("/listings/new", isLoggedIn, listingsController.renderNewForm);

// 3. Check authentication status
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};
```

</details>

---

### 📸 File Upload & Storage

| Package | Version | Purpose |
|---------|---------|---------|
| **multer** | ^2.0.2 | Middleware for handling multipart/form-data |
| **cloudinary** | ^1.41.3 | Cloud-based image and video management |
| **multer-storage-cloudinary** | ^4.0.0 | Cloudinary storage engine for Multer |

<details>
<summary><b>📘 Upload Flow</b></summary>

```javascript
// 1. Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "roamr" },
});

// 2. Create multer instance
const upload = multer({ storage });

// 3. Use in route
router.post("/", upload.single("listing[image]"), createListing);

// 4. Access uploaded file
let url = req.file.path;        // Cloudinary URL
let filename = req.file.filename; // Cloudinary public_id
```

</details>

---

### ✅ Validation & Error Handling

| Package | Purpose |
|---------|---------|
| **joi** | Schema-based data validation for JavaScript objects |

<details>
<summary><b>📘 Validation Example</b></summary>

```javascript
const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
});

function validateReview(req, res, next) {
  const { error } = reviewSchema.validate(req.body.review);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
```

</details>

---

### 🛠️ Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| **method-override** | ^3.0.0 | Override HTTP verbs (enable PUT/DELETE in forms) |
| **dotenv** | ^17.2.3 | Load environment variables from .env file |
| **axios** | ^1.13.2 | Promise-based HTTP client for API requests |

<details>
<summary><b>📘 Method Override Example</b></summary>

```html
<!-- HTML Form that sends DELETE request -->
<form method="POST" action="/listings/<%= list._id %>?_method=DELETE">
  <button>Delete</button>
</form>
```

```javascript
// app.js - Enable method override
app.use(methodOverride("_method")); // Converts POST to DELETE
```

</details>

---

### 🎯 Why These Packages?

| Requirement | Package Used | Reason |
|-------------|--------------|---------|
| Need MongoDB ORM | **Mongoose** | Industry standard with schema validation |
| Need user authentication | **Passport.js** | Flexible, supports multiple strategies |
| Need cloud image storage | **Cloudinary** | Free tier, CDN, automatic optimization |
| Need persistent sessions | **connect-mongo** | Prevents memory leaks, production-ready |
| Need template engine | **EJS** | JavaScript-based, easy learning curve |
| Need input validation | **Joi** | Schema-based validation with clear errors |


📁 Folder Structure

roamr/
│
├── controllers/              # Business logic layer
│   ├── listings.js          # CRUD operations for listings
│   ├── reviews.js           # Create/delete reviews
│   └── user.js              # Signup, login, logout
│
├── models/                   # Database schemas
│   ├── listing.js           # Listing schema with owner & reviews
│   ├── review.js            # Review schema with author
│   └── user.js              # User schema with passport plugin
│
├── routes/                   # URL routing
│   ├── listing.js           # Routes for /listings
│   ├── review.js            # Routes for /listings/:id/reviews
│   └── user.js              # Routes for /signup, /login, /logout
│
├── views/                    # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout (navbar, footer, scripts)
│   │
│   ├── listings/
│   │   ├── index.ejs        # All listings grid
│   │   ├── show.ejs         # Single listing with map & reviews
│   │   ├── new.ejs          # Create listing form
│   │   ├── edit.ejs         # Edit listing form
│   │   └── error.ejs        # Error page
│   │
│   ├── users/
│   │   ├── signup.ejs       # Signup form
│   │   └── login.ejs        # Login form
│   │
│   └── includes/
│       ├── navbar.ejs       # Navigation bar
│       ├── footer.ejs       # Footer with links
│       └── flash.ejs        # Success/error messages
│
├── public/                   # Static assets
│   ├── css/
│   │   ├── style.css        # Main stylesheet
│   │   └── rating.css       # Star rating styles
│   │
│   └── js/
│       └── script.js        # Form validation script
│
├── utils/                    # Helper functions
│   ├── ExpressError.js      # Custom error class
│   ├── wrapAsync.js         # Async error wrapper
│   └── reviewValidation.js  # Joi validation middleware
│
├── init/                     # Database initialization
│   ├── data.js              # Sample listings data
│   └── index.js             # Script to seed database
│
├── middleware.js             # Custom middleware (auth, authorization)
├── cloudConfig.js            # Cloudinary & Multer configuration
├── app.js                    # Main application file
├── .env                      # Environment variables (not in repo)
├── .gitignore                # Ignored files
├── package.json              # Dependencies
└── README.md                 # Project documentation
---

## 🎓 What I Learned

### 1. 🏗️ MVC Architecture

- ✅ **Separation of Concerns**: Models, Views, Controllers
- ✅ **Clean Code Organization**: Structured and maintainable codebase
- ✅ **Scalability**: Easy to add new features without breaking existing code
- ✅ **Maintainability**: Each layer is independent and testable

---

### 2. 🌐 RESTful API Design

- ✅ Proper HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
- ✅ Resource-based URLs (`/listings`, `/listings/:id`)
- ✅ Appropriate status codes (200, 404, 500, etc.)
- ✅ CRUD operations implementation
- ✅ API versioning concepts

---

### 3. 🗄️ MongoDB & Mongoose

- ✅ **Schema Design**: Defining data structure and validation
- ✅ **Relationships**: One-to-Many using ObjectId references
- ✅ **Population**: Replacing IDs with actual documents
- ✅ **Cascade Deletes**: Using middleware for data integrity
- ✅ **Indexing**: Optimizing query performance

---

### 4. 🔐 Authentication & Authorization

- ✅ **Authentication vs Authorization**: Understanding the difference
- ✅ **Session-based Auth**: Using Passport.js for user management
- ✅ **Password Hashing**: pbkdf2 algorithm for security
- ✅ **Route Protection**: Middleware for access control
- ✅ **Session Storage**: MongoDB for production scalability

---

### 5. 📸 File Uploads

- ✅ Handling `multipart/form-data` with Multer
- ✅ Cloud storage (Cloudinary) vs local server storage
- ✅ Generating unique filenames to prevent conflicts
- ✅ Image optimization for web performance
- ✅ File type validation and size limits

---

### 6. 🔄 Middleware Concept

- ✅ **Request-Response Cycle**: Understanding the flow
- ✅ **Order Matters**: Middleware execution sequence
- ✅ **Custom Middleware**: Creating authentication checks
- ✅ **Error Handling**: 4-parameter error middleware
- ✅ **Third-party Middleware**: Using express-session, multer, etc.

---

### 7. ⚠️ Error Handling

- ✅ Custom error classes for different scenarios
- ✅ Async error handling with `try-catch`
- ✅ Global error handler for centralized error management
- ✅ User-friendly error pages
- ✅ Validation error handling with Joi

---

### 8. 🎨 Template Engines (EJS)

- ✅ Embedding JavaScript in HTML templates
- ✅ Layouts and partials for code reusability
- ✅ Passing data from controllers to views
- ✅ Conditional rendering based on data
- ✅ Loops and iterations in templates

---

### 9. 🛡️ Security Best Practices

- ✅ **Never store plain text passwords**: Always hash
- ✅ **HttpOnly cookies**: Prevent XSS attacks
- ✅ **Session expiration**: Auto-logout for security
- ✅ **Authorization checks**: Verify ownership before actions
- ✅ **Input validation**: Sanitize and validate all user input

---

### 10. 🔧 Development Workflow

- ✅ Environment variables with **dotenv**
- ✅ Git version control and commit best practices
- ✅ Debugging techniques (console.log, breakpoints)
- ✅ Testing routes with Postman/browser
- ✅ Reading and understanding documentation

---

### 11. 🎨 Frontend Integration

- ✅ **Bootstrap 5**: Responsive grid system and components
- ✅ **Font Awesome**: Icon integration
- ✅ **JavaScript**: Client-side form validation
- ✅ **Leaflet.js**: Interactive map rendering
- ✅ **API Integration**: Geoapify geocoding service

---

### 12. 🌱 Database Seeding

- ✅ Creating realistic sample data
- ✅ Automating database population
- ✅ Resetting database for testing purposes
- ✅ Seed data management strategies

---

### 💡 Key Takeaways

| Concept | Before Project | After Project |
|---------|---------------|---------------|
| **Full-stack Development** | Theoretical knowledge | Hands-on practical experience |
| **Database Design** | Basic CRUD | Complex relationships & optimization |
| **Security** | Awareness | Implementation of best practices |
| **Deployment** | Local only | Production-ready deployment |



---

## 🚀 Installation

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=nodedotjs) **Node.js** (v18 or higher)
- ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb) **MongoDB** (local or Atlas account)
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-Account-3448C5) **Cloudinary** account (free tier)
- ![Geoapify](https://img.shields.io/badge/Geoapify-API_Key-FF6B6B) **Geoapify** API key (free)

---

### ⚙️ Setup Instructions

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/roamr.git
cd roamr
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGO_API=mongodb://localhost:27017/roamr

# Or for MongoDB Atlas:
# MONGO_API=mongodb+srv://username:password@cluster.mongodb.net/roamr

# Session Secret (use a strong random string)
SECRET=your_secret_key_here_make_it_long_and_random

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Geoapify API Key
GEOAPIFY_API_KEY=your_geoapify_api_key

# Environment
NODE_ENV=development
```

#### 4️⃣ Seed the Database (Optional)

```bash
cd init
node index.js
cd ..
```

#### 5️⃣ Run the Application

```bash
node app.js
```

#### 6️⃣ Open in Browser

Navigate to **http://localhost:8080**

---

### 🔑 Getting API Keys

<details>
<summary><b>🌥️ Cloudinary Setup</b></summary>

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → **Account Details**
3. Copy the following:
   - Cloud Name
   - API Key
   - API Secret

</details>

<details>
<summary><b>🗺️ Geoapify Setup</b></summary>

1. Sign up at [geoapify.com](https://geoapify.com)
2. Go to **Dashboard** → **API Keys**
3. Copy your API key

</details>

---

### 🚢 Production Deployment

For deploying to platforms like **Render**, **Heroku**, or **Railway**:

1. ✅ Set environment variables in platform dashboard
2. ✅ Change `NODE_ENV=production`
3. ✅ Uncomment `store` in session options (line 62, `app.js`)
4. ✅ Use **MongoDB Atlas** instead of local MongoDB
5. ✅ Ensure all sensitive data is in environment variables

**Deployment Checklist:**

```bash
✓ Environment variables configured
✓ MongoDB Atlas connection string
✓ Session store enabled
✓ Cloudinary credentials set
✓ Port configuration (process.env.PORT || 8080)
```



---

## 🔮 Future Improvements

### 🔍 Search & Discovery

#### 1. Advanced Search & Filter

- 🔎 Search listings by title, location, country
- 💰 Filter by price range with sliders
- ⭐ Sort by price, rating, newest first
- 🏔️ Category-based filtering (mountains, beaches, cities, etc.)
- 📍 Proximity-based search (find listings near me)

#### 2. Pagination

- 📄 Implement pagination (10-20 listings per page)
- ♾️ Infinite scroll option for better UX
- ⚡ Improve performance with large datasets
- 🔢 Page number navigation

---

### 💳 Booking & Payments

#### 3. Booking System

- 📅 **Calendar availability** for listings
- 📆 **Date range selection** for bookings
- 💳 **Payment gateway** integration (Stripe/Razorpay)
- ✉️ **Booking confirmation** emails
- 🧾 **Invoice generation**
- ❌ **Cancellation policy** management

---

<div align="center">

### 🎯 Roadmap Priority

| Priority | Features | Timeline |
|----------|----------|----------|
| **High** 🔴 | Search/Filter, Booking System, User Profiles | Q1 2026 |
| **Medium** 🟡 | REST API, Email Notifications, Reviews Enhancement | Q2 2026 |
| **Low** 🟢 | Mobile App, Analytics, Advanced Security | Q3-Q4 2026 |

</div>



---

## 📄 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2026 Roamr

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 👤 Author

**Prathamesh**

- 🐙 GitHub: (https://github.com/PrathameshBhosale01)
---

## 🙏 Acknowledgments

Special thanks to:

- **Apna College** - For the comprehensive full-stack development course
- **Unsplash** - For high-quality listing images
- **Cloudinary** - For reliable cloud image hosting
- **MongoDB Atlas** - For database hosting and management
- **Geoapify** - For geocoding API services
- **Bootstrap Team** - For the responsive UI framework
- **Passport.js Community** - For authentication solutions
- **Open Source Community** - For amazing packages and tools

---

## 🐛 Known Issues

| Issue | Description | Workaround |
|-------|-------------|------------|
| 🗺️ **Map Default** | Map defaults to Mumbai if location not found | Ensure proper location format |
| ⚙️ **Session Store** | Commented out in development (line 62, app.js) | Uncomment for production |
| 📸 **File Size** | No client-side upload size limit | Add validation in form |
| 🌐 **Browser Support** | Limited IE11 support | Use modern browsers (Chrome, Firefox, Edge) |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔀 **Open** a Pull Request

### 📝 Contribution Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

---


## ⭐ Show Your Support

If you found this project helpful or learned something from it, please consider:

- ⭐ **Starring** the repository
- 🍴 **Forking** it for your own projects
- 📢 **Sharing** it with others
- 💬 **Providing feedback** through issues or discussions

<div align="center">

### Made with ❤️ by [Prathamesh](https://github.com/PrathameshBhosale01)

**[⬆ Back to Top](#-roamr---travel-listing-web-application)**

</div>
