console.log('Client javascript file');

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.innerHTML = "Loading...";
    message2.innerHTML = "";
    
    fetch('/weather?address=' + address.value)
        .then(response => {  //Promise
            response.json().then(data => {
                if(data.error) {
                    message1.innerHTML = data.error;
                }else{
                    message1.innerHTML = "<b>Location:</b> " + data.location;
                    message2.innerHTML = "<b>Forecast:</b> " + data.forecast;
                }
            });
        });
})