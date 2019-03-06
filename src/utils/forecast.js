const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2d8fc608972551fbe2a10b7311d04c88/'+latitude+','+longitude
               +'?units=si&lang=en';
  
    request({url, json:true}, (error, {body}) => {
      const {temperature, precipProbability: rainProbability} = body.currently;
      const {summary} = body.daily.data[0];

      if(error) {
        callback('Unable to connect to weather service');
      }else if(body.error) {
        callback('Unable to find the location');
      }else{
        callback(undefined,`${summary}. It is currently ${temperature} degrees out. There is a ${rainProbability}% chance of rain.`);
      }
    });
  };
  
  module.exports = forecast;