const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema= new Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image: {
  filename: {
    type: String,
    default: "listingimage"
  },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
  }
}
,
    price:Number,
    location:String,
    country:String,
      owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

    reviews:[
      {
      type:Schema.Types.ObjectId,
      ref:"Review",
   
    },

  ],
  // Major Project - Copy/models/listing.js

    // ... existing fields
    // category: {
    //     type: String,
    //     enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"],
    //     required: true
    // },
  category: {
    type: [String],   // ✅ allows multiple categories
    enum: [
      "Trending",
      "New",
      "Top Rated",

      "Rooms",
      "Apartments",
      "Villas",
      "Cabins",

      "Beach",
      "Mountains",
      "City",
      "Countryside",

      "Luxury",
      "Budget",
      "Pet Friendly",
      "Family Friendly",
      "Unique Stays"
    ],
    required: true
  },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
  await Review.deleteMany({_id:{ $in: listing.reviews}});
}
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;