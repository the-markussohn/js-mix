/**
 * @todo show alert when user not found using UI class
 * @todo clear profile when text box is empty
 * @todo logic when user found
 */

const github = new Github();
const searchUser = document.querySelector('#search-user');

searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    if (userText !== '') {
        github.getUser(userText)
            .then((result) => {
                if (result.profile.message === 'Not Found') {
                    
                } else {
                    
                }
            }).catch((err) => {
                console.log(error);
            });
    } else {
        
    }
});