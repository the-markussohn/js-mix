class UI {

    showOutput(res) {
        const outputDiv = document.querySelector('.output');
        outputDiv.innerHTML = `<p>${res}</p>`;
    }
}

class RequestHandler {

    static makeGetRequest() {
        http.get(url)
            .then(data => ui.showOutput(JSON.stringify(data)))
            .catch(err => ui.showOutput(err));
    }

    static makePostRequest() {
        http.post(url, data)
            .then(data => ui.showOutput(JSON.stringify(data)))
            .catch(err => ui.showOutput(err));
    }

    static makePutRequest() {
        http.put(`${url}/2`, data)
            .then(data => ui.showOutput(JSON.stringify(data)))
            .catch(err => ui.showOutput(err));
    }

    static makeDeleteRequest() {
        http.delete(`${url}/2`, data)
            .then(data => ui.showOutput(data))
            .catch(err => ui.showOutput(err));
    }
}

const http = new EasyHttp();
const ui = new UI();

const data = {
    name: 'Name',
    username: 'Username',
    email: 'name@username.com'
}

const url = 'https://jsonplaceholder.typicode.com/users';

document.querySelector('#button-one').addEventListener('click', RequestHandler.makeGetRequest);
document.querySelector('#button-two').addEventListener('click', RequestHandler.makePostRequest);
document.querySelector('#button-three').addEventListener('click', RequestHandler.makePutRequest);
document.querySelector('#button-four').addEventListener('click', RequestHandler.makeDeleteRequest);