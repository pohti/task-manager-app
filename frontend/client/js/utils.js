


let disableLoginForms = () => {
    //disable the forms
    let loginform = document.getElementById("loginform");
    
    let elements = loginform.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
}

let getAllTasks = () => {
    fetch ('http://127.0.0.1:3000/tasks', {
        method:     'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2MTAyYTBkZjJkZDQ3MDA4NTFjMjUiLCJpYXQiOjE2MDE3MzQxMzJ9.RIvQbklY40y4UVMWZw3KOSeB7n5GzwzzWKcZdjkEQM8'
        }
    })
    .then (res => res.json())
    .then (data => {
        console.log(data)
    })
    .catch (error => {
        console.log(`${error}`)
    })
}

getAllTasks()