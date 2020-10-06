// function to get all tasks from the middleware
let getAllTasks = (cb) => {
    fetch (`http://127.0.0.1:3000/tasks`, {
        method:     'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    })
    .then (res => res.json())
    .then (data => {
        cb(data)
    })
    .catch (error => {
        console.log(`${error}`)
        cb(null)
    })
}

// function for adding a single task to the list
let appendTask = (taskDescription, status, id) => {
    let node = document.createElement("li")
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("id", id)
    checkbox.checked = status

    let label = document.createElement("label")
    label.innerHTML = taskDescription

    node.append(checkbox)
    node.append(label)

    document.getElementById("task-list").appendChild(node)
}

// Implementing logout function
let logOutButton = document.getElementById('logout-button')
logOutButton.onclick = () => {
    localStorage.clear()
    alert("You have logged out from the session.")
    window.location.href = "/"
}

// Implementing add new task feature
let addTaskButton = document.getElementById('add-task-button')
addTaskButton.onclick = () => {
    let textInput = document.getElementById('add-new-task-input')
    let taskDescription = textInput.value

    if (taskDescription) {
        appendTask(taskDescription, false)
    }
}

// display correct username
// get all the tasks
// extract description and status (completed)
// display that on HTML
// add event listeners for each checkbox
// add event listener for SAVE button
let usernameP = document.getElementById('username-p')
usernameP.innerHTML = `Username: ${localStorage.getItem('username')}`

getAllTasks((taskList) => {
    if (taskList) {
        taskList.map(task => {
            appendTask(task.description, task.completed, task._id)
        })
    }
    else console.log('Failed to fetch task list')
})


