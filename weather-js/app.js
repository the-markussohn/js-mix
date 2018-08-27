const weather = new Weather('Vilnius');

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeather()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
}