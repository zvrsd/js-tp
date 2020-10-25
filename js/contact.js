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


phoneInput.addEventListener('input', checkPhoneDyn);

// Sets the button onclick method
sendButton.onclick =
function send() {

    isEverythingOk = true;
    
    for (var i = 0; i < titles.length; i++) {
        title = titles[i].checked ? titles[i].value : title;
    }
    
    // Checks email
    if(!checkEmail(emailInput.value)){
        errorLabel.innerHTML = ERROR_FIELDS;
        isEverythingOk = false;
    }
    else{
        errorLabel.innerHTML = '';
    }
    
    // Checks firstname
    if(!checkName(firstNameInput.value)){
        isEverythingOk = false;
        firstNameInput.style.borderColor = "crimson";
    }
    else{
        firstNameInput.style.borderColor = "green";
        errorLabel.innerHTML = '';
    }
    
    // Checks lastname
    if(!checkName(lastNameInput.value)){
        isEverythingOk = false;
        lastNameInput.style.borderColor = "crimson";
    }
    else{
        lastNameInput.style.borderColor = "green";
        errorLabel.innerHTML = '';
    }
    
    // Checks email
    if(!checkEmail(emailInput.value)){
        isEverythingOk = false;
        emailInput.style.borderColor = "crimson";
    }
    else{
        emailInput.style.borderColor = "green";
        errorLabel.innerHTML = '';
    }
    
    // Checks phone
    if(!checkPhone(phoneInput.value)){
        isEverythingOk = false;
        phoneInput.style.borderColor = "crimson";
    }
    else{
        phoneInput.style.borderColor = "green";
        errorLabel.innerHTML = '';
    }
    
    // Checks message
    if(!checkMessage(messageInput.value)){
        isEverythingOk = false;
        messageInput.style.borderColor = "crimson";
    }
    else{
        messageInput.style.borderColor = "green";
        errorLabel.innerHTML = '';
    }
    
    // Checks terms n conditions
    if(!checkTerms(termsAcceptInput,termsReadInput)){
        isEverythingOk = false;
        errorLabel.innerHTML = ERROR_AGREE;
        termsAcceptInput.style.borderColor = "crimson";
    }
    else{
        errorLabel.innerHTML = '';
    }
    
    
    // If there was no error during the checks
    if(isEverythingOk){
        document.write('Your contact infos have been submit');
    }
    
    consolePrint();
}

// Checks email - return true if the email is valid
function checkEmail(email) {
  return REGEX_EMAIL.test(email);
}
// Checks name - return true if name is valid
function checkName(name){
    if(name == ""){
        return false;
    }
    return true;
}
// Checks name - return true if name is valid
function checkPhone(name){
    
    console.log("test phone :"+REGEX_PHONE.test(name));
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


function checkPhoneDyn (event) {
    console.log(phoneInput.value);
    
    if(checkPhone(phoneInput.value)){
        phoneInput.style.borderColor = "green";
    }
    else{
        phoneInput.style.borderColor = "crimson";
    }
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