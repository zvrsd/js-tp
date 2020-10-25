var number1 = document.getElementById("number1");
var number2 = document.getElementById("number2");
var number3 = document.getElementById("number3");
var result = document.getElementById("result");

var listInput1 = document.getElementsByClassName("numbers");
var listInput = document.querySelectorAll(".numbers");
console.log(listInput, listInput1);

listInput.forEach(function(element){
        element.addEventListener('input', addAll);
});

number1.addEventListener('input', addAll);
number2.addEventListener('input', addAll);
number3.addEventListener('input', addAll);


// Add
function add(a, b){
    return a + b;
}
// Substract
function sub(a, b){
    return a - b;
}
// Multiply
function mul(a, b){
    return a * b;
}
// Divide
function div(a, b){
    return a / b;
}
// Modulus
function mod(a, b){
    return a % b;
}

var currentNav = navigator.userAgent;
console.log("Current browser : "+currentNav);

// Main substitute
function run(){
    
    var a = 124;
    var b = 56;
    
    console.log(a+" + "+b+" = "+add(a,b));
    console.log(a+" - "+b+" = "+sub(a,b));
    console.log(a+" * "+b+" = "+mul(a,b));
    console.log(a+" / "+b+" = "+div(a,b));
    console.log(a+" % "+b+" = "+mod(a,b));
}

// Add all fields from the table
function addAll(event){
    
    
    console.log(event);

    if(isNaN(event.target.value)){
        result.innerHTML = "NAN";
    }
    
    else{
        result.innerHTML = parseInt(number1.value) + parseInt(number2.value) + parseInt(number3.value);
    }
}