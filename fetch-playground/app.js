document.querySelector('#button-one').addEventListener('click', getText);
document.querySelector('#button-two').addEventListener('click', getJson);
document.querySelector('#button-three').addEventListener('click', getApiData);

function getText() {
    fetch('test.txt')
        .then(function (res) {
            return res.text();
        })
        .then(function (data) {
            console.log(data);
            document.querySelector('#output').innerHTML = data;
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getJson() {
    fetch('post.json')
        .then(function (res) {
            return res.json();
        })
        .then(function(data){
            console.log(data);
            let output = '';
            data.forEach(function(item){
                output += `<li>${JSON.stringify(item)}</li>`;
            });
            document.querySelector('#output').innerHTML = output;
        })
        .catch(function(err){
            console.log(err);
        });
}

function getApiData() {
    fetch('https://api.github.com/users')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let output = '';
            data.forEach(function (user) {
                output += `<li>${user.login}</li>`;
            });
            document.querySelector('#output').innerHTML = output;
        })
        .catch(function (err) {
            console.log(err);
        });
}