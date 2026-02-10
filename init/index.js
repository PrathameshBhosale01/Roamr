// const mongoose = require("mongoose");
// const Listing = require("../models/listing.js");
// const initData = require("./data.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/roamr";

// async function main() {
//   await mongoose.connect(MONGO_URL);
//   console.log("connected to DB");
// }

// main().catch(err => console.log(err));

// const initDB = async () => {
//   try {
//     await Listing.deleteMany({});

//     // ✅ ONE owner ObjectId
//     const ownerId = new mongoose.Types.ObjectId(
//       "652d0081ae547c5d37e56b5f"
//     );

//     // ✅ Add owner to EVERY listing
//     const listingsWithOwner = initData.data.map(listing => ({
//       ...listing,
//       owner: ownerId
//     }));

//     await Listing.insertMany(listingsWithOwner);
//     console.log("data was initialized");

//   } catch (err) {
//     console.log("ERROR WHILE INSERTING DATA:");
//     console.log(err.message);
//   } finally {
//     await mongoose.connection.close();
//     console.log("DB connection closed");
//   }
// };

// initDB();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/roamr";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
}

main().catch(err => console.log(err));

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create a user first
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword" // Use proper hashing in production
    });

    // Use the created user's ID
    const listingsWithOwner = initData.data.map(listing => ({
      ...listing,
      owner: user._id
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("data was initialized");

  } catch (err) {
    console.log("ERROR WHILE INSERTING DATA:");
    console.log(err.message);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
  }
};

initDB();