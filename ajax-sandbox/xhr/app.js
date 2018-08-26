document.querySelector('#button').addEventListener('click', loadData);

function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
            const resp = JSON.parse(xhr.response);
            const div = document.querySelector('#output');
            const ul = document.createElement('ul');
            div.appendChild(ul);
            resp.forEach(item => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(item.title));
                ul.appendChild(li);
            });
        }
    };

    // Ready State Change
    // xhr.onreadystatechange = () => {
    //     console.log('READYSTATE', xhr.readyState);
    //     if (xhr.status === 200 && xhr.readyState === 4) {
    //         console.log(xhr.response);
    //     }
    // };

    // Spinners/Loaders
    // xhr.onprogress = () => {
    //     console.log('READYSTATE', xhr.readyState);
    // };

    // On Error
    // xhr.onerror = () => {
    //     console.log('error');
    // };

    xhr.send();
}

// readyState values
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready


// HTTP
// 200: "OK"
// 403: "Forbidden"
// 404: "Not Found"