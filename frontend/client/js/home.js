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

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "x"
    deleteButton.setAttribute("class", `delete-task-button`)
    deleteButton.setAttribute("id", id)

    node.append(checkbox)
    node.append(label)
    node.append(deleteButton)

    document.getElementById("task-list").appendChild(node)
}

// function to submit the task to the middleware
let submitTask = (taskDescription, cb) => {
    let taskToSubmit = {
        description: taskDescription,
        completed: false
    }
    fetch('http://127.0.0.1:3000/tasks', {
        method:     'POST',
        headers:    {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(taskToSubmit)
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            console.log(data)
            cb(data)
        }
    })
    .catch(error => {
        console.log('Failed to submit task', error)
        cb(null)
    })
}

// Implementing logout function
let logOutButton = document.getElementById('logout-button')
logOutButton.onclick = () => {
    localStorage.clear()
    alert("You have logged out from the session.")
    window.location.href = "/"
}

// Implementing add new task feature
let submitTaskButton = document.getElementById('add-task-button')
submitTaskButton.onclick = () => {
    let textInput = document.getElementById('add-new-task-input')
    let taskDescription = textInput.value

    if (taskDescription) {
        // send the task to server
        submitTask(taskDescription, (result) => {
            if(result) {
                alert('Task submitted successfully')
                location.reload() // reflect that on the page
            }
            else alert('Failed to submit task. Please try again.')
        })
    }
}

// Implementing delete task feature
// let deleteTaskButtons = document.getElementsByClassName('delete-task-button')
// console.log(deleteTaskButtons)
// deleteTaskButtons.foreach(button => {
//     console.log(button)
// })

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


