var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');

const db = 'mongodb://grantmonty:montgomery@ds119064.mlab.com:19064/grantufdirectory';
mongoose.Promise = global.Promise;
mongoose.connect(db, {useMongoClient: true}, function(err){
  if(err){
    console.error("Error! " + err);
  }
});


/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
   Listing.findOne({'code' : "LBWEST"}, function(err, docs){
    
    console.log(docs);
    
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 

   */

    Listing.findOne({'code' : "CABL"}, function(err, docs){
    console.log("The Following Listing will be Removed");
    console.log(docs);

    Listing.remove({'code' : "CABL"}, function(err){
      if (!err) {
        console.log("CABL has been removed!");
      }
      else {
        console.log("error");
      }
    });
    
   });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

    Listing.findOne({'code' : "PHL"}, function(err, docs){
    
    console.log(docs);
    
   });

  Listing.update({'code' : "PHL"}, {'name' : 'Phelps Memorial Hospital', 'address' : '701 N Broadway Route 9, Sleepy Hollow, NY 10591, United States'}, function(err,docs){
    console.log(docs);
    console.log("Phelps Laboratory has been changed to Phelps Memorial Hospital")
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

   Listing.find(function(err,docs){
    console.log(docs);
   });


};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
