const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2d8fc608972551fbe2a10b7311d04c88/'+latitude+','+longitude
               +'?units=si&lang=en';
  
    request({url, json:true}, (error, {body}) => {
      const {temperature, precipProbability} = body.currently;
      const {summary, temperatureMin, temperatureMinTime, temperatureMax, temperatureMaxTime} = body.daily.data[0];
      
      if(error) {
        callback('Unable to connect to weather service');
      }else if(body.error) {
        callback('Unable to find the location');
      }else{
        const dateMax = new Date(temperatureMaxTime * 1000);
        const dateMin = new Date(temperatureMinTime * 1000);
        const message = `${summary} `+ 
                        `It is currently ${temperature} degrees out. `+
                        `The highest today is at ${temperatureMax} (${formatTime(dateMax)}) and lowest at ${temperatureMin} (${formatTime(dateMin)}). `+
                        `There is a ${precipProbability * 100.00}% chance of rain.`;
        callback(undefined,message);
      }
    });
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours > 0 ? hours : 12;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
  }

  
  module.exports = forecast;