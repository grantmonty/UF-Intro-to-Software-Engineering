'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');


var listingData;
var code,name,coordinates,address;
var newEntry;

/* Connect to your database */
const db = 'mongodb://grantmonty:montgomery@ds119064.mlab.com:19064/grantufdirectory';
mongoose.Promise = global.Promise;
mongoose.connect(db, {useMongoClient: true}, function(err){
  if(err){
    console.error("Error! " + err);
  }
});


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

console.log("starting...");

fs.readFile('listings.json', 'utf8', function(err, data) {


   listingData = JSON.parse(data);

   for (var i = 0; i<listingData.entries.length; i++)
   {
      name = listingData.entries[i].name;
      code = listingData.entries[i].code;
      coordinates = undefined;
      address = null;

      if(listingData.entries[i].coordinates != null){
      coordinates = {
        longitude: listingData.entries[i].coordinates.longitude,
        latitude: listingData.entries[i].coordinates.latitude
      };
    }

    if(listingData.entries[i].address != null){
      address = listingData.entries[i].address;
    }

      var newEntry = new Listing (
        {

          code: code,
          name: name,
          coordinates: coordinates,
          address: address

        }
        
        );

    newEntry.save(function(err) {
    if (err) throw err; 

      console.log('Entry saved successfully');

    });

   }
 
});



console.log("...finished");

/*


////////  THIS WAS USED FOR TESTING PURPOSES OF ENTERING A SPECIFIC LISTING ////////

var newEntry = new Listing ({

            code: "PCPA", 
            name: "Phillips Center for the Performing Arts", 
            coordinates: {
                "latitude": 29.6352583, 
                "longitude": -82.36930579999999
            }, 
            address: "3201 Hull Rd, Gainesville, FL 32611, United States"
  
});

newEntry.save(function(err) {
  if (err) throw err; 

  console.log('Entry saved successfully');
});

//////////////////////////////////////////////////////////////////////////////////

*/
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */


