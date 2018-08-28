import {http} from "./http";
import {ui} from "./ui";

class App {

    loadEventListeners() {
        document.addEventListener('DOMContentLoaded', this.getPosts);
    };

    getPosts() {
        http.get('http://localhost:3000/posts')
            .then(data => ui.showPosts(data))
            .catch(err => console.log(err));
    }

    init() {
        this.loadEventListeners();
    }
}

const app = new App();
app.init();