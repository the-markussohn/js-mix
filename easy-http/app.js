const http = new EasyHttp();

// http.get('https://jsonplaceholder.typicode.com/todos', function (error, data) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(data);
// 	}
// });

const data = {
	title: 'Custom TODO',
	completed: false
};

// http.post('https://jsonplaceholder.typicode.com/todos', data, function (error, post) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(post)
// 	}
// });

// http.put('https://jsonplaceholder.typicode.com/todos/1', data, function (error, post) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(post);
// 	}
// });

http.delete('https://jsonplaceholder.typicode.com/todos/1', function (error, data) {
	if (error) {
		console.log(error);
	} else {
		console.log(data);
	}
});