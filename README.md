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


## ✨ Features & Functionality

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Secure login/signup with Passport.js, password hashing (pbkdf2), and MongoDB session storage |
| 📝 **CRUD Operations** | Full create, read, update, delete functionality for listings with owner authorization |
| 📸 **Image Uploads** | Cloud storage via Cloudinary with Multer middleware for seamless file handling |
| ⭐ **Review System** | Star ratings (1-5) and comments with author tracking and nested population |
| 🔒 **Authorization** | Middleware-protected routes ensuring only owners can edit/delete their content |
| 💬 **Flash Messages** | Real-time success/error notifications for user actions |
| 🗺️ **Interactive Maps** | Leaflet.js with Geoapify geocoding for location visualization |
| ⚠️ **Error Handling** | Custom error classes with global error handler and async wrapper utilities |
| 🔄 **Session Management** | MongoDB-backed sessions with secure httpOnly cookies and auto-expiration |

---

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

<img width="531" height="850" alt="Screenshot 2026-02-10 161446" src="https://github.com/user-attachments/assets/eb0e82b3-090f-4488-a165-8133c3dddee2" />



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
