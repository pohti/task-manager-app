


let disableLoginForms = () => {
    //disable the forms
    let loginform = document.getElementById("loginform");
    
    let elements = loginform.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
}



