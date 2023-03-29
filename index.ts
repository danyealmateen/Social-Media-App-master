import { createNewUser, createUserBtn, getUsers, postMessageBtn, postMessages, logIn, loginBtn } from "./src/modules/users/users";

createUserBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createNewUser();
})

postMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    postMessages()
})

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    logIn()
})

