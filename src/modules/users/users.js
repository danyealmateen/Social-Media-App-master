const createUserBtn = document.getElementById("createUserBtn");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const displayUsernames = document.getElementById('displayUsernames');
const inputForMessages = document.getElementById('inputForMessages');
const postMessageBtn = document.getElementById('postMessageBtn');
postMessageBtn.disabled = true;
const messagesForUser = document.getElementById('messagesForUser');
const loginBtn = document.getElementById('loginBtn');
const postedMessagesContainer = document.getElementById('postedMessagesContainer');
const avatarIMGS = document.getElementById('avatarIMGS');
const createUserDiv = document.getElementById('createUserDiv');
const postMessageContainer = document.getElementById('postMessageContainer');
const loggedInAs = document.getElementById('loggedInAs');
let statusUpdatesContainer = document.getElementById('statusUpdatesContainer');
let currentStatusData;
let userInfo = {
    username: inputUsername.value,
    password: inputPassword.value,
    statusUpdates: [inputForMessages.value],
};
//CREATE USERS
async function createNewUser() {
    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/${inputUsername.value}.json`;
    const init = {
        method: "PUT",
        body: JSON.stringify((userInfo = {
            username: inputUsername.value,
            password: inputPassword.value,
            statusUpdates: inputForMessages.value,
            imageURL: avatarIMGS.value,
        })),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };
    const users = await getUsers();
    if (inputUsername.value in users) {
        console.log("User already exists");
        return;
    }
    if (inputUsername.value === "" || inputPassword.value === "") {
        return messagesForUser.innerText = `Must write something in both fields.`;
    }
    const response = await fetch(url, init);
    const data = await response.json();
    messagesForUser.innerText = `New user created. You may login.`;
}
postMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
});
//GET USERS
async function getUsers() {
    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/.json`;
    const response = await fetch(url);
    const userData = await response.json();
    return userData;
}
//POST MESSAGES
async function postMessages() {
    const inputForMessages = document.getElementById('inputForMessages');
    const inputUsername = document.getElementById("inputUsername");
    const inputPassword = document.getElementById("inputPassword");
    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/${inputUsername.value}.json`;
    currentStatusData.push(inputForMessages.value);
    const init = {
        method: "PUT",
        body: JSON.stringify((userInfo = {
            username: inputUsername.value,
            password: inputPassword.value,
            statusUpdates: currentStatusData,
        })),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };
    const response = await fetch(url, init);
    const userData = await response.json();
    let postParagraph = document.createElement('p');
    postParagraph.innerText = `${inputUsername.value}${inputForMessages.value}`;
    postedMessagesContainer?.append(postParagraph);
    displayAllStatusUpdates();
}
//LOG IN
async function logIn() {
    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/.json`;
    const response = await fetch(url);
    const userData = await response.json();
    if (inputUsername.value in userData && inputPassword.value === userData[inputUsername.value].password) {
        postMessageBtn.disabled = false;
        messagesForUser.innerText = `You've successfully logged in!`;
        createUserDiv.style.display = "none";
        loggedInAs.innerHTML = `You are logged in as: ${inputUsername.value} <img src="${avatarIMGS.value}"/>`;
        postMessageContainer.style.display = "block";
        getStatusUpdate();
        displayUsers();
        displayAllStatusUpdates();
    }
    else {
        messagesForUser.innerText = `Wrong username, wrong password or account does not exist.`;
    }
    // getStatusUpdate()
}
//GET STATUSUPDATES
async function getStatusUpdate() {
    const url = `https://socialapp-8a221-default-rtdb.europe-west1.firebasedatabase.app/${inputUsername.value}/statusUpdates.json`;
    const response = await fetch(url);
    const statusData = await response.json();
    console.log(statusData);
    if (statusData === "") {
        currentStatusData = [];
    }
    else if (typeof statusData === "string") {
        currentStatusData = [statusData];
    }
    else {
        currentStatusData = statusData;
    }
}
//DISPLAY USERS
async function displayUsers() {
    const userData = await getUsers();
    const getusernamesFromObj = Object.entries(userData);
    getusernamesFromObj.forEach(username => {
        const ele = document.createElement('div');
        ele.innerText = `${username[0]}`;
        ele.addEventListener('click', () => {
            console.log(username[0] + " " + "clicked");
        });
        displayUsernames.appendChild(ele);
    });
}
//DISPLAY ALL MSG
async function displayAllStatusUpdates() {
    const userData = await getUsers();
    statusUpdatesContainer.innerHTML = "";
    for (const username in userData) {
        const statusUpdate = userData[username].statusUpdates;
        const statusUpdateElement = document.createElement('p');
        statusUpdateElement.innerText = `${username}: ${statusUpdate}`;
        statusUpdatesContainer?.appendChild(statusUpdateElement);
    }
}
export { createNewUser, createUserBtn, getUsers, postMessages, postMessageBtn, loginBtn, logIn };
