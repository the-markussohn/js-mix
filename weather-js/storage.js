class Storage {
    constructor() {
        this._city;
        this._defaultCity = 'Vilnius';
    }

    getLocationData() {
        if (localStorage.getItem('city') === null) {
            this._city = this._defaultCity;
        } else {
            this._city = localStorage.getItem('city');
        }

        return {
            city: this._city
        }
    }
    
    setLocationData(city) {
        localStorage.setItem('city', city);
    }
}