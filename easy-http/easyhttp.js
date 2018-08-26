function EasyHttp() {
	this.http = new XMLHttpRequest();
}

// GET Request
EasyHttp.prototype.get = function (url, callback) {
	this.http.open('GET', url, true);

	let self = this;
	this.http.onload = function () {
		if (self.http.status === 200) {
			callback(null, self.http.response);
		} else {
			callback(`Error: ${self.http.status}`);
		}
	};

	this.http.send();
};

// POST Request
EasyHttp.prototype.post = function (url, data, callback) {
	this.http.open('POST', url, true);
	this.http.setRequestHeader('Content-Type', 'application/json');
	
	let self = this;
	this.http.onload = function(){
		callback(null, self.http.response);
	};

	this.http.send(JSON.stringify(data));
}

// PUT Request
EasyHttp.prototype.put = function (url, data, callback) {
	this.http.open('PUT', url, true);
	this.http.setRequestHeader('Content-Type', 'application/json');

	let self = this;
	this.http.onload = function () {
		callback(null, self.http.response);
	};

	this.http.send(JSON.stringify(data));
}

// DELETE Request
EasyHttp.prototype.delete = function (url, callback) {
	this.http.open('DELETE', url, true);

	let self = this;
	this.http.onload = function () {
		if (self.http.status === 200) {
			callback(null, 'Post Deleted');
		} else {
			callback(`Error: ${self.http.status}`);
		}
	};

	this.http.send();
};