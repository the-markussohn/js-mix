const weather = new Weather('Vilnius');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);
document.querySelector('#w-change-btn').addEventListener('click', () => {
    const city = document.querySelector('#city').value;
    weather.changeLocation(city);
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