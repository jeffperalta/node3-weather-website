const request = require('request');

const geocode = (address, callback) => {
    const location = encodeURI(address);
    if(location.length == 0) {
      return callback('Location cannot be empty');
    }

    const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiamF5ZG9jcGVyYWx0YSIsImEiOiJjanN0dTFwa2IyN2lzNDNsaWZyMWt5amxkIn0.TUbebLW-B3eYT9ggE2dkng&limit=1';
    request({url: geocodeURL, json:true}, (error, {body})=>{
      const {features} = body;
      if(error) {
        callback('Unable to connect to location service');
      }else if(features.length === 0) {
        callback('Unable to find the location. Try another search.');
      }else{
        const [longitude,latitude] = features[0].center;
        const location = features[0].place_name;
        callback(undefined,{
          latitude, longitude, location
        });
      }
    });
  };

  module.exports = geocode;