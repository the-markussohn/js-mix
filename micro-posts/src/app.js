import {http} from "./http";
import {ui} from "./ui";

class App {

    loadEventListeners() {
        document.addEventListener('DOMContentLoaded', this.getPosts);
        document.querySelector('.post-submit').addEventListener('click', this.submitPost.bind(this));
        document.querySelector('#posts').addEventListener('click', this.deletePost);
        document.querySelector('#posts').addEventListener('click', this.enableEdit);
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

    deletePost() {

    }

    enableEdit(e) {
        if (e.target.parentElement.classList.contains('edit')) {
            const id = e.target.parentElement.dataset.id;
            const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
            const body = e.target.parentElement.previousElementSibling.textContent;
            const data = {
                id,
                title,
                body
            };
            ui.fillForm(data);
        }
        e.preventDefault();
    }

    init() {
        this.loadEventListeners();
    }
}

const app = new App();
app.init();