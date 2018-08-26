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


// PUT Request


// DELETE Request