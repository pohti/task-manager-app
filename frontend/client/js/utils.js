const ENV = {
    DEV_MIDDLEWARE_URL:     "http://127.0.0.1:3000",
    PROD_MIDDLEWARE_URL:    "https://mmo-task-manager.herokuapp.com"
}

let disableLoginForms = () => {
    //disable the forms
    let loginform = document.getElementById("loginform");
    
    let elements = loginform.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
}



