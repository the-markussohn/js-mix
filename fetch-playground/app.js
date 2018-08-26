document.querySelector('#button-one').addEventListener('click', getText);
document.querySelector('#button-two').addEventListener('click', getJson);
document.querySelector('#button-three').addEventListener('click', getApiData);

function getText() {
    fetch('test.txt')
        .then(res => res.text())
        .then(data => {
            console.log(data);
            document.querySelector('#output').innerHTML = data;
        })
        .catch(err => console.log(err));
}

function getJson() {
    fetch('post.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let output = '';
            data.forEach(function(item){
                output += `<li>${JSON.stringify(item)}</li>`;
            });
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err));
}

function getApiData() {
    fetch('https://api.github.com/users')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let output = '';
            data.forEach(function (user) {
                output += `<li>${user.login}</li>`;
            });
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err));
}