const ui = new UI();
const storage = new Storage();

const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city);

document.addEventListener('DOMContentLoaded', getWeather);
document.querySelector('#w-change-btn').addEventListener('click', () => {
    const city = document.querySelector('#city').value;
    weather.changeLocation(city);
    storage.setLocationData(city);
    getWeather();
    $('#locModal').modal('hide');
});

function getWeather() {
    weather.getWeather()
        .then(result => {
            ui.paint(result);
        })
        .catch(err => console.log(err));
}