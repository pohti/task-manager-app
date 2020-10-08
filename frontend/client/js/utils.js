const PROD_MIDDLEWARE_URL = "https://mmo-task-manager.herokuapp.com"
const DEV_MIDDLEWARE_URL = "http://127.0.0.1:3000"

const MIDDLEWARE_URL = PROD_MIDDLEWARE_URL

let disableLoginForms = () => {
    //disable the forms
    let loginform = document.getElementById("loginform");
    
    let elements = loginform.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
}



