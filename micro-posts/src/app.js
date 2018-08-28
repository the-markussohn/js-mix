import {http} from "./http";
import {ui} from "./ui";

class App {

    loadEventListeners() {
        document.addEventListener('DOMContentLoaded', this.getPosts);
        document.querySelector('.post-submit').addEventListener('click', this.submitPost.bind(this));
    };

    getPosts() {
        http.get('http://localhost:3000/posts')
            .then(data => ui.showPosts(data))
            .catch(err => console.log(err));
    }

    submitPost() {
        const post = ui.getPostFromUI();
        http.post('http://localhost:3000/posts', post)
            .then((data) => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                this.getPosts();
            })
            .catch(err => console.log(err));
    }

    init() {
        this.loadEventListeners();
    }
}

const app = new App();
app.init();