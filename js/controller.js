'use strict'

function onInitUser() {
    var currUser = getCurrUser()
    if (!currUser) window.location.href = 'index.html'
    updateLoginTime(currUser)
    renderUserBar(currUser)
    if (currUser.isAdmin) {
        document.querySelector('.admin-link').classList.remove('hidden')
    }
}

function onInitAdmin() {
    var currUser = getCurrUser()
    if (!currUser || !currUser.isAdmin) window.location.href = 'safe-content.html'
    renderUserBar(currUser)
    renderUsers()
}

function renderUserBar(user) {
    document.querySelector('.username').innerText = user.username
    document.querySelector('.user-img').src = `imgs/${user.img}.png`
}

function renderUsers() {
    const users = getUsersToShow()
    const strHTMLs = users.map((user, idx) => {
        return `<tr>
        <td><img class="user-img-admin-panel" src="/imgs/${user.img}.png" alt="userImg"></td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.lastLoginToDisplay}</td>
        <td>${user.isAdmin}</td>
        </tr>`
    })
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onLoginSend(ev) {
    ev.preventDefault()

    const elNameInput = document.querySelector('input[name="username"]')
    const elPassInput = document.querySelector('input[name="password"]')
    var validUser = validLogin(elNameInput.value, elPassInput.value)

    if (validUser) {
        window.location.href = 'safe-content.html'
    } else {
        elNameInput.classList.add('wrong')
        elPassInput.classList.add('wrong')
    }
}

function onLogOut() {
    clearStorage()
}


function onSetSort(sortBy) {
    setSort(sortBy)
    renderUsers()
}