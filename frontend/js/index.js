const herokuServerURL = 'https://mmo-task-manager.herokuapp.com'
// const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTRlMDYzZGZmOTEwMjAwMTdiZWY0ZDkiLCJpYXQiOjE1ODIxNzE3MDl9.Qu2ilQhs1oVM_R3OfoieK5DQGlO8Kw92tXu1pWIj4OA'


const loginURL = herokuServerURL + '/users/login'
const PARTICULARS = {
    email: 'minmarnoo@gmail.com',
    password: 'abc123!'
}

// Login event listener
loginButton = document.getElementById("loginButton")
loginButton.onclick = () => verifyUser(()=> {
    // IF: SUCCESSFUL
    // Save token as cookie
    // Display options for user
    if (localStorage.getItem('authToken')) {
        alert('Login successful! Redirecting to home page')
        //window.location.href = "./home.html"
    }
    else {
        alert('Failed to login')
        //location.reload()
    }
})

// to verify user particulars with the server
let verifyUser = (cb) => {
    let username = document.getElementById("form-username").value
    let password = document.getElementById("form-password").value
    let user_particulars = {username, password}
    console.log(`username: ${username} | password: ${password}`)

    fetch(loginURL, {
        method:     'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(PARTICULARS)
    })
    .then(res => res.json())
    .then(data => {
        if(data.token) {
            console.log(data)
            localStorage.setItem('authToken', data.token) // saving JWT token
        }
        else //localStorage.clear()
        cb()
    })
    .catch(error => {
        //localStorage.clear()
        console.log(`Error: ${error}`)
        cb()
    })
    
}

getAllTasks()
