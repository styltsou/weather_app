const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');

const loader = document.querySelector('.loader');

const errorMessage = document.querySelector('.error-message');

const dataCard = document.querySelector('.forecast-card');

const locationr = document.getElementById('location');
const summaryr = document.getElementById('summary');
const temperaturer = document.getElementById('temperature');
const precipProbabilityr = document.getElementById('precip-probability');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (dataCard.classList.contains('visible')) {
        dataCard.classList.remove('visible');
    }

    if (errorMessage.classList.contains('error')) {
        errorMessage.classList.remove('error')
        setTimeout(() => {
            loader.classList.add('loading');
        }, 100);
    } else {
        loader.classList.add('loading');
    }
    
    
    fetch(`http://localhost:5000/weather?address=${searchInput.value}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                loader.classList.remove('loading');

                errorMessage.classList.add('error');
                errorMessage.textContent = data.error;
            } else {
                loader.classList.remove('loading');
                dataCard.classList.add('visible');

                locationr.textContent = data.location;
                summaryr.textContent = data.forecast.summary;
                temperaturer.textContent = data.forecast.temperature;
                precipProbabilityr.textContent = `${data.forecast.precipProbability}%`;
            }
        });
    });
});





