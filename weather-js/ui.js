class UI {
    constructor() {
        this._location = document.querySelector('#w-location');
        this._description = document.querySelector('#w-desc');
        this._temperature = document.querySelector('#w-string');
        this._details = document.querySelector('#w-details');
        this._icon = document.querySelector('#w-icon');
        this._humidity = document.querySelector('#w-humidity');
        this._wind = document.querySelector('#w-wind');
    }

    paint(weatherData) {
        this._location.textContent = weatherData.name;
        this._description.textContent = `${weatherData.weather[0].main} - ${weatherData.weather[0].description}`;
        this._temperature.textContent = `${weatherData.main.temp}°C`;
        const dayTime = this.getDayTime(weatherData.sys.sunrise, weatherData.sys.sunset);
        this._icon.className = `wi wi-owm-${dayTime}-${weatherData.weather[0].id}`;
        this._humidity.textContent = `Relative Humidity: ${weatherData.main.humidity} %`;
        this._wind.textContent = `Wind: ${weatherData.wind.speed} m/s`;
    }

    getDayTime(sunrise, sunset) {
        const date = new Date();
        const sunriseTime = new Date(sunrise * 1000);
        const sunsetTime = new Date(sunset * 1000);

        if (date.getHours() >= sunriseTime.getHours() && date.getHours() < sunsetTime.getHours()) {
            return 'day';
        } else {
            return 'night';
        }
    }
}