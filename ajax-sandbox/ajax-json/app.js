const uri = 'https://jsonplaceholder.typicode.com/users';

document.querySelector('#button-1').addEventListener('click', loadCustomer);
document.querySelector('#button-2').addEventListener('click', loadCustomers);

function loadCustomer() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', uri + '/1', true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const customer = JSON.parse(xhr.response);
            const output = `
                <ul>
                    <li>ID: ${customer.id}</li>
                    <li>Username: ${customer.username}</li>
                    <li>Name: ${customer.name}</li>
                    <li>Phone: ${customer.phone}</li>
                </ul>
            `;
            document.querySelector('#customer').innerHTML = output;
        }
    };

    xhr.send();
}

function loadCustomers() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', uri, true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const customers = JSON.parse(xhr.response);
            const customersDiv = document.querySelector('#customers');
            customers.forEach(customer => {
                const output = `
                <ul>
                    <li>ID: ${customer.id}</li>
                    <li>Username: ${customer.username}</li>
                    <li>Name: ${customer.name}</li>
                    <li>Phone: ${customer.phone}</li>
                </ul>
            `;
                customersDiv.innerHTML += output;
            });
        }
    };

    xhr.send();
}