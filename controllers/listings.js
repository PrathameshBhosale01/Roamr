const Listing=require("../models/listing.js");

module.exports.index= async(req,res)=>{
   let filter = {};
   if(req.query.category){
      filter.category = req.query.category;
   }
   const allListing= await Listing.find(filter);
   res.render("listings/index",{allListing});
};

module.exports.renderNewForm=(req,res)=>{
  res.render("listings/new.ejs") ;   
}

module.exports.showListing=async(req,res)=>{
  let {id}=req.params;
  const listing= await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author",
  },
})
  .populate("owner");

  if(!listing){
    req.flash("error","Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  
   res.render( "listings/show.ejs",{listing})
};

module.exports.createListing =async(req,res,next)=>{
   const newListing= new Listing(req.body.listing);
   newListing.owner=req.user._id;
   if(req.file){
     newListing.image.filename=req.file.filename;
     newListing.image.url=req.file.path;
   }
  await newListing.save();
  req.flash("success","New listing is created!")
  res.redirect("/listings");

};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
       
       if(!listing){
    req.flash("error","Listing you requested for does not exist");
    return res.redirect("/listings");
  } 
   let originalImageUrl=listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImageUrl});

};

module.exports.updateListing=async(req,res)=>{

   if(!req.body.listing){
    throw new ExpressError(400,"Send valid data for listing");
  }
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=="undefined"){         // updates image when user want ,or else it will be blank
     let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
     req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
   let {id}=req.params;
   let deletedListing= await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    console.log(deletedListing);
   res.redirect("/listings");
}