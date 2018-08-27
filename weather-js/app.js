const weather = new Weather('Vilnius');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeather()
        .then(result => {
            ui.paint(result);
        })
        .catch(err => console.log(err));
}