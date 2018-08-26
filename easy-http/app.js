const http = new EasyHttp();

http.get('https://jsonplaceholder.typicode.com/todos', function (error, data) {
	if (error) {
		console.log(error);
	}
	console.log(data);
});