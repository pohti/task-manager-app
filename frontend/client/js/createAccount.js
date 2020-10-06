// let createAccountForm = document.getElementById('create-account-form')
// createAccountForm

let submitAccount = (particulars, cb) => {
    fetch ('http://127.0.0.1:3000/users', {
        method:     'POST',
        headers:    {'Content-Type': 'application/json'},
        body:       JSON.stringify(particulars)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cb(data)
    })
    .catch(error => {
        console.log(error)
        cb(null)
    })
}

let createAccountButton = document.getElementById('create-account-button')
createAccountButton.onclick = () => {
    // extract all info
    let name = document.getElementById('username-input').value.toLowerCase()
    let email = document.getElementById('email-input').value.toLowerCase()
    let age = document.getElementById('age-input').value
    let password = document.getElementById('password-input').value
    let repeatPassword = document.getElementById('password-confirmation-input').value

    // check password confirmation and submit
    if (password != repeatPassword) {
        alert('Password incorrect. Please try again!')
    }
    else {
        console.log({name, email, age, password})

        // submit to middleware
        submitAccount({name, email, age, password}, (result) => {
            if (result) {
                alert(`User account create successful! Welcome ${result.user.name}!`)
                window.location.href = "/"
            }
            else alert('Failed to create user. Please try again')
        })
    }

}