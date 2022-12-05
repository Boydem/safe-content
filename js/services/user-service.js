const STORAGE_KEY = 'usersDB'

var gUsers
var gUser
var gSortBy = 'name'

_createUsers()


function validLogin(userNameInput, passInput) {
    var user = gUsers.find((user) => user.username === userNameInput && user.password === passInput)
    if (user) {
        saveToStorage('logedUser', user)
        return user
    }
    return null
}

function getUsersToShow() {
    sortUsers(gSortBy)
    return gUsers
}

function getUserIdx(user) {
    return gUsers.findIndex((gUser) => {
        return gUser.username === user.username
    })
}

function sortUsers(sortBy) {
    if (sortBy === 'name') {
        gUsers.sort((a, b) => {
            if (a.username.toLowerCase() > b.username.toLowerCase()) return 1
            if (a.username.toLowerCase() < b.username.toLowerCase()) return -1
            return 0
        })
    } else if (sortBy === 'lastLogin') {
        gUsers.sort((a, b) => {
            if (a.lastLoginTime > b.lastLoginTime) return -1
            if (a.lastLoginTime < b.lastLoginTime) return 1
            return 0
        })
    }
}

function updateLoginTime(user) {
    const currUserIdx = getUserIdx(user)
    gUsers[currUserIdx].lastLoginTime = Date.now()
    gUsers[currUserIdx].lastLoginToDisplay = getDateToDisplay(gUsers[currUserIdx].lastLoginTime)
    saveToStorage(STORAGE_KEY, gUsers)
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getCurrUser() {
    return loadFromStorage('logedUser')
}

function _createUsers() {
    gUsers = loadFromStorage(STORAGE_KEY)
    if (!gUsers || !gUsers.length) {
        gUsers = [
            _createUser('Noam', 'juju', true, 1),
            _createUser('tal', 'kuku', false, 2),
            _createUser('baba', 'secret', false, 3),
        ]
        saveToStorage(STORAGE_KEY, gUsers)
    }
}

function getDateToDisplay(date = null) {
    const dateStr = !date ? new Date() : new Date(date)
    return dateStr.getDate() + '/' + (dateStr.getMonth() + 1) + '/' + dateStr.getFullYear() + ' ' + dateStr.getHours() + ':' + dateStr.getMinutes()
}

function _createUser(username, password, isAdmin = false, img) {
    return {
        id: _makeId(),
        username,
        password,
        lastLoginTime: Date.now(),
        lastLoginToDisplay: getDateToDisplay(),
        isAdmin,
        img
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}