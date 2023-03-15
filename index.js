(function () {
    const container = document.querySelector('.weather__container');
    const search = document.getElementById('search__btn');
    const weatherBox = document.querySelector('.weather__box');
    const weatherDetails = document.querySelector('.weather__details');
    const error = document.querySelector('.not__found');

    search.addEventListener('click', () => {
        const APIKey = 'ddbd6a7a1032dbc81b1c9931adf56fb5';
        const city = document.querySelector('.enter__location').value;
    
        if (city === '')
            return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                // обробка даних про погоду
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') {
                    container.style.height = '400px';
                    weatherBox.style.display = 'none';
                    weatherDetails.style.display = 'none';
                    error.style.display = 'block';
                    error.classList.add('fadeIn');
                    return;
                }

                error.style.display = 'none';
                error.classList.remove('fadeIn');

                const temperature = document.querySelector('.temperature');
                const description = document.querySelector('.description');
                const humidity = document.querySelector('.humidity');
                const wind = document.querySelector('.wind');

                const timezone = json.timezone;
                const currentTime = Math.floor(new Date().getTime() / 1000);
                const sunriseTime = json.sys.sunrise + timezone;
                const sunsetTime = json.sys.sunset + timezone;
                let weatherImage = document.querySelector('.weather__img');

                if (currentTime > sunriseTime && currentTime < sunsetTime)  {
                    switch (json.weather[0].main) {
                        case 'Clear':
                            weatherImage.src = 'images/clear.png';
                            break;
    
                        case 'Clouds':
                            weatherImage.src = 'images/cloud.png';
                            break;
    
                        case 'Fog':
                            weatherImage.src = 'images/foggy.png';
                            break;
    
                        case 'Rain':
                            weatherImage.src = 'images/rain.png';
                            break;
    
                        case 'Snow':
                            weatherImage.src = 'images/snow.png';
                            break;
    
                        default:
                            weatherImage.src = ' ';
                    }
                } else {
                    switch (json.weather[0].main) {
                        case 'Clear':
                            weatherImage.src = 'images/clear-night.png';
                            break;
    
                        case 'Clouds':
                            weatherImage.src = 'images/cloud-night.png';
                            break;
    
                        case 'Fog':
                            weatherImage.src = 'images/foggy-night.png';
                            break;
    
                        case 'Rain':
                            weatherImage.src = 'images/rain-night.png';
                            break;
    
                        case 'Snow':
                            weatherImage.src = 'images/snow-night.png';
                            break;
    
                        default:
                            weatherImage.src = ' ';
                    }
                }
                
                temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>°C<span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '500px';
            })
    });
    const changeBackground = () => {
        const body = document.querySelector('body');
        const now = new Date();
        const hour = now.getHours();

        if (hour > 5 && hour < 11) {
            body.style.backgroundImage = 'url(images/morning.jpg)';
        } else if (hour >= 11 && hour < 17) {
            body.style.backgroundImage = 'url(images/day.jpg)';
        } else if (hour >= 17 && hour < 23 ) {
            body.style.backgroundImage = 'url(images/sunset.jpg)';
        } else {
            body.style.backgroundImage = 'url(images/night.jpg)';
        }
    };
    changeBackground();
})();

