// function to get all tasks from the middleware
let getAllTasks = (cb) => {
    fetch (`${MIDDLEWARE_URL}/tasks`, {
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
let appendTask = (taskDescription, status, task_id) => {
    // create 'li' element to contain
    let node = document.createElement("li")
    node.setAttribute("task_id", task_id)

    // create a 'checkbox' and add Event Listener
    // giving it appropriate ID and attributes
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("checkbox_id", task_id)
    checkbox.checked = status
    checkbox.onclick = (e) => {
        let parent = e.target.parentElement
        console.log(parent)
    }

    // task description
    let textarea = document.createElement("textarea")
    textarea.innerHTML = taskDescription

    // creating an 'update button' and adding Event Listener
    let updateButton = document.createElement("button")
    updateButton.innerHTML = "Update"
    updateButton.onclick = (e) => {
        let parent = e.target.parentElement
        console.log(parent)
    }

    // creating a 'delete button' and adding Event Listener
    // giving it appropriate ID and attributes
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"
    deleteButton.onclick = (e) => {
        let parent = e.target.parentElement
        console.log(parent)
    }

    node.append(checkbox)
    node.append(textarea)
    node.append(updateButton)
    node.append(deleteButton)

    document.getElementById("task-list").appendChild(node)
}

// function to submit the task to the middleware
let submitTask = (taskDescription, cb) => {
    let taskToSubmit = {
        description: taskDescription,
        completed: false
    }
    fetch(`${MIDDLEWARE_URL}/tasks`, {
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
// TO-DO: need to send POST request for logging out
const logOutUser = (cb) => {
    fetch(`${MIDDLEWARE_URL}/users/logout`, {
        method          : 'POST',
        headers         : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then (res => res.json())
    .then (data => {
        if (data.message == 'success'){
            cb(data.message)
        }
        else cb('Failed to log out')
    })
    .catch (err => {
        cb(err)
    })
}

let logOutButton = document.getElementById('logout-button')
logOutButton.onclick = () => {
    logOutUser((result) => {
        if (result == 'success') {
            localStorage.clear()
            alert("You have logged out from the session.")
            window.location.href = "/"
        }
        else {
            alert ('Failed to log out. Please try again.')
            console.log(result)
        }
    })

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



// TODO
// Implementing delete task feature
// let deleteTaskButtons = document.getElementsByClassName('delete-task-button')
// console.log(deleteTaskButtons)
// deleteTaskButtons.foreach(button => {
//     console.log(button)
// })


// TODO
// display correct username (DONE)
// get all the tasks (DONE)
// extract description and status (DONE)
// display that on HTML (DONE)
// implement logout feature (DONE)
// add event listeners for each checkbox
// add event listener for delete button
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


