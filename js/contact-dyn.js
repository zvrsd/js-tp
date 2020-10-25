ERROR_FIELDS = "Some fields are invalid";
ERROR_EMAIL = "Email is incorrect";
ERROR_AGREE = "Please read and agree the terms";

REGEX_PHONE = /^(01|02|03|04|05|06|07|08|09)[0-9]{8}$/;
REGEX_EMAIL = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

var sendButton = document.getElementById('send');

var titles = document.getElementsByName('gender');
var firstNameInput = document.getElementById("firstname");
var lastNameInput = document.getElementById("lastname");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var messageInput = document.getElementById("message");
var termsReadInput = document.getElementById("read");
var termsAcceptInput = document.getElementById("agree");

var errorLabel = document.getElementById("error_label");
var errorFirstname = document.getElementById("error_firstname");

var title = '';
var isEverythingOk = true;

firstNameInput.addEventListener('input', checkNameDyn);
lastNameInput.addEventListener('input', checkNameDyn);
phoneInput.addEventListener('input', checkPhoneDyn);
emailInput.addEventListener('input', checkEmailDyn);

// Sets the button onclick method
sendButton.onclick =
function send() {

    isEverythingOk = true;
    
    for (var i = 0; i < titles.length; i++) {
        title = titles[i].checked ? titles[i].value : title;
    }
    
    // Checks email
    if(!checkEmail(emailInput.value)){
        isEverythingOk = false;
    }    
    // Checks firstname
    if(!checkName(firstNameInput.value)){
        isEverythingOk = false;
    }
    // Checks lastname
    if(!checkName(lastNameInput.value)){
        isEverythingOk = false;
    }   
    // Checks email
    if(!checkEmail(emailInput.value)){
        isEverythingOk = false;
    }
    // Checks phone
    if(!checkPhone(phoneInput.value)){
        isEverythingOk = false;
    }   
    // Checks message
    if(!checkMessage(messageInput.value)){
        isEverythingOk = false;
    }    
    // Checks terms n conditions
    if(!checkTerms(termsAcceptInput,termsReadInput)){
        isEverythingOk = false;
    }
    // If there was no error during the checks
    if(isEverythingOk){
        document.write('Your contact infos have been submit');
    }
    consolePrint();
}

// ========= EMAIL CHECK ===========
// Checks email - return true if the email is valid
function checkEmailDyn(event) {
    
    input = event.target;
    inputError = document.getElementById("error_"+input.id);
    
    //console.log(input);
    
    if(checkEmail(input.value)){
        input.style.borderColor = "green";
        inputError.innerHTML = " ";
    }
    else if(checkEmail.value == ""){
        input.style.borderColor = "grey";
        inputError.innerHTML = " ";
    }
    else if(!checkEmail(input.value)){
        input.style.borderColor = "crimson";
        inputError.innerHTML = "error";
    }   
}
function checkEmail(email) {
  return REGEX_EMAIL.test(email);
}

// ========= NAME CHECK ===========
// Checks name - return true if name is valid
function checkNameDyn(event) {
    input = event.target;
    inputError = document.getElementById("error_"+input.id);
    
    //console.log(input);
    //console.log(input.value);
    
    if(checkName(input.value)){
        input.style.borderColor = "green";
        inputError.innerHTML = " ";
    }
    else if(input.value == ""){
        input.style.borderColor = "grey";
        inputError.innerHTML = "";
    }
    else if(!checkName(input.value)){
        input.style.borderColor = "crimson";
        inputError.innerHTML = "error";
    }
}
function checkName(name){
    if(isNaN(name)){
        return true;
    }
    return false;
}

// ========= PHONE CHECK ===========
// Checks name - return true if name is valid
function checkPhoneDyn (event) {
    
    input = event.target;
    inputError = document.getElementById("error_"+input.id);
    
    //console.log(input);
    
    if(checkPhone(phoneInput.value)){
        phoneInput.style.borderColor = "green";
        inputError.innerHTML = " ";
    }
    else if(phoneInput.value == ""){
        phoneInput.style.borderColor = "grey";
        inputError.innerHTML = "";
    }
    else if(!checkPhone(phoneInput.value)){
        phoneInput.style.borderColor = "crimson";
        inputError.innerHTML = "error";
    }
}
function checkPhone(name){
    //console.log("test phone :"+REGEX_PHONE.test(name));
    return REGEX_PHONE.test(name);
}


// Checks message - return true if message is valid
function checkMessage(name){
    if(name.length > 10 || name.length == 0){
        return false;
    }
    return true;
}

// Checks terms - return true if terms and conds is valid
function checkTerms(accept, read){
    if(accept.checked && read.checked){
        return true;
    }
    return false; 
}




// Prints all the form into console
function consolePrint(){
    console.log('')
    console.log('---------------------------------------')
    console.log("title : " + title);
    console.log("firstname : " + firstNameInput.value +" : "+ checkName(firstNameInput.value));
    
    console.log("lastname : " + lastNameInput.value +" : "+ checkName(lastNameInput.value));
    
    console.log("email : " + emailInput.value+" : "+ checkEmail(emailInput.value));
    
    console.log("phone : " + phoneInput.value+" : "+ checkPhone(phoneInput.value));
    
    console.log("message : " + messageInput.value+" : "+checkMessage(messageInput.value));
    
    console.log("read conds : " + termsReadInput.checked);
    console.log("accept conds : " + termsAcceptInput.checked);
    console.log('---------------------------------------')
}