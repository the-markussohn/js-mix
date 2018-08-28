import {http} from "./http";
import {ui} from "./ui";

class App {

    loadEventListeners() {
        document.addEventListener('DOMContentLoaded', this.getPosts);
        document.querySelector('.post-submit').addEventListener('click', this.submitPost.bind(this));
        document.querySelector('#posts').addEventListener('click', this.deletePost.bind(this));
        document.querySelector('#posts').addEventListener('click', this.enableEdit);
        document.querySelector('.card-form').addEventListener('click', this.cancelEdit);
    };

    getPosts() {
        http.get('http://localhost:3000/posts')
            .then(data => ui.showPosts(data))
            .catch(err => console.log(err));
    }

    submitPost() {
        const post = ui.getPostFromUI();
        if (!this.isEmptyObject(post)) {
            if (post.id === '') {
                http.post('http://localhost:3000/posts', post)
                    .then((data) => {
                        ui.showAlert('Post added', 'alert alert-success');
                        ui.clearFields();
                        this.getPosts();
                    })
                    .catch(err => console.log(err));
            } else {
                http.put(`http://localhost:3000/posts/${post.id}`, post)
                    .then((data) => {
                        ui.showAlert('Post updated', 'alert alert-success');
                        ui.changeFormState('add');
                        this.getPosts();
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    deletePost(e) {
        if (e.target.parentElement.classList.contains('delete')) {
            const id = e.target.parentElement.dataset.id;
            if (confirm('Are you sure?')) {
                http.delete(`http://localhost:3000/posts/${id}`)
                    .then((data) => {
                        ui.showAlert('Post removed', 'alert alert-success');
                        this.getPosts();
                    })
                    .catch(err => console.log(err));
            }
        }
        e.preventDefault();
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

    cancelEdit(e) {
        if (e.target.classList.contains('post-cancel')) {
            ui.changeFormState('add');
        }

        e.preventDefault();
    }

    isEmptyObject(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    init() {
        this.loadEventListeners();
    }
}

const app = new App();
app.init();