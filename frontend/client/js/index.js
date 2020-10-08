
// Login event listener
let loginButton = document.getElementById("loginButton")
loginButton.onclick = () => verifyUser(()=> {
    // IF: SUCCESSFUL
    // Save token as cookie
    // Display options for user
    if (localStorage.getItem('authToken')) {
        alert('Login successful! Redirecting to home page')
        
        window.location.href = "./home.html"
    }
    else {
        alert('Failed to login')
        location.reload()
    }
})


// to verify user particulars with the server
let verifyUser = (cb) => {
    let email = document.getElementById("form-email").value
    let password = document.getElementById("form-password").value

    console.log(`email: ${email} | password: ${password}`)

    fetch(`${MIDDLEWARE_URL}/users/login`, {
        method:     'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {
        if(data.token) {
            console.log(data, 'authToken saved in localStorage')
            localStorage.setItem('authToken', data.token) // saving JWT token
            localStorage.setItem('username', data.user.name)
        }
        else localStorage.clear()
        cb()
    })
    .catch(error => {
        localStorage.clear()
        console.log(`${error}`)
        cb()
    })
    
}

let createAccountButton = document.getElementById("create-account-button")
createAccountButton.onclick = () => {
    window.location.href = "/createaccount.html"
}