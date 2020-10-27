// =========================//
// ===== MODEL ENTITY ===== //
// ======================== //
class Student {

    id;
    name;
    gender;
    phone;
    address;

    constructor() {

    }
}

// --------------------------------------------------------------------
$(document).ready(initEvents());

// --------------------------------------------------------------------

// ===========================//
// ====== UI FUNCTIONS ====== //
// ========================== //

/**
 * Initializes all events
 */
function initEvents() {

    // When Add Random student is clicked
    $("#add_random_student").click(function () {
        console.log("student add random clicked");
        getRandomStudent(addStudentRow);
    });
    // When Add student is clicked
    $("#add_student").click(function () {
        console.log("student add clicked");
        displayForm(addStudent);
    });
}

/**
 * Obtains a full row containing students details
 *
 */
function createStudentRow(student) {

    let studentTR = document.createElement("tr");
    let studentTD;
    let editButton;
    let deleteButton;

    studentTR.id = "student_" + student.id;

    console.log("stdd " + student);

    for (const [key, value] of Object.entries(student)) {

        studentTD = document.createElement("td");

        // Sets the id and the content for this columns
        studentTD.id = studentTR.id + "_" + key;
        studentTD.innerHTML = value;
        console.log(`${key}: ${value}`);

        // Adds the current td to the tr
        studentTR.appendChild(studentTD);
    }

    // Creates and adds the buttons
    studentTD = document.createElement("td");
    editButton = document.createElement("button");
    editButton.id = "delete_" + student.id;
    editButton.innerHTML = "E";
    studentTD.appendChild(editButton);
    studentTR.appendChild(studentTD);


    studentTD = document.createElement("td");
    deleteButton = document.createElement("button");
    deleteButton.classList.add("remove_button");
    deleteButton.id = "delete_" + student.id;
    deleteButton.innerHTML = "X";
    studentTD.appendChild(deleteButton);
    studentTR.appendChild(studentTD);


    console.log("tr = " + studentTR);

    return studentTR;
}

/**
 * Add a new student and creates all the visual for it
 */
function addStudentRow(student) {
    // Creates and add a new row to the students table
    $("#students_table").append(createStudentRow(student));
}

/*
 * Displays the form used to add or edit a student
 */
function displayForm(callback) {

}

/*
 * Loading modal
 */
function setLoadingScreen() {
    $(".modal").css("display", "block");
}

function clearLoadingScreen() {
    $(".modal").css("display", "none");
}

// --------------------------------------------------------------------

// ===========================//
// ===== CRUD FUNCTIONS ===== //
// ========================== //
const students = [];

/*
 * Add a student into the list
 */
function addStudent(student) {
    students.push(student);
}

/*
 * Gets a random student via some external API
 *
 */
function getRandomStudent(callback) {

    setLoadingScreen();

    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',

        success: function (data) {

            // Displays the output data from API into the log
            console.log(data);

            const firstName = data.results[0].name.first;
            const lastName = data.results[0].name.last;

            const student = new Student();

            student.id = students.length;
            student.name = firstName + " " + lastName;
            student.gender = data.results[0].gender;
            student.phone = data.results[0].phone;
            student.address = data.results[0].location.city;

            students.push(student);

            console.log("student = " + student);
            callback(student);
            clearLoadingScreen();
        },
        error: function () {
            console.log("AJAX ERROR");
            clearLoadingScreen();
        }
    });
}

