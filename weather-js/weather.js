class Weather {
    constructor(city) {
        this._apiKey = '37c163d2290022b0c2aa2f422a7a3c17'
        this._city = city;
    }

    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this._city}&units=metric&APPID=${this._apiKey}`);
        const responseData = await response.json();
        return responseData;
    }

    changeLocation(city) {
        this._city = city;
    }
}