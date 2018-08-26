/**
 * @todo fetch repos
 */

const github = new Github();
const ui = new UI();
const searchUser = document.querySelector('#search-user');

searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if (userText !== '') {
        github.getUser(userText)
            .then((result) => {
                if (result.profile.message === 'Not Found') {
                    ui.showAlert('User not found', 'alert alert-danger');
                } else {
                    ui.showProfile(result.profile);
                }
            }).catch((err) => {
                console.log(error);
            });
    } else {
        ui.clearProfile();
    }
});