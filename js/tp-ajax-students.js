const STUDENTS_URL = "data/students.json";


getRates();

//getStudents();

function getStudents(callback) {

    $.ajax({

        url: STUDENTS_URL,
        dataType: "JSON",

        success: function (data) {
            console.log(data);

            accepted = [];
            refused = [];

            console.log(data);
            // Iterates over the student list
            data.etudiants.forEach(function (student) {

                // If student grade is too low
                if (student.moyenne > 10) {
                    student.passed = "Accepté";
                    accepted.push(student);
                } else {
                    student.passed = "Refusé";
                    accepted.push(student);
                }
            });
            updateList(accepted);
        },

        error: function () {
            console.log("error");
        }

    });
}

/*
 * Updates the list
 */
function updateList(accepted, refused) {

    var tableContent = $("#accepted_table");
    var tableHead = $("<thead>");
    console.log(tableHead);

    var studentRow = null;
    var studentHeader = null;
    var studentData = null;

    studentRow = document.createElement("tr");

    for (let key in accepted[0]) {
        studentRow = document.createElement("tr");
        studentHeader = document.createElement("th");
        studentHeader.innerHTML = key;

        studentRow.appendChild(studentHeader);
        tableHead.append(studentRow);
    }
    // Loop over accepted students
    for (let key in accepted) {

        studentRow = document.createElement("tr");

        // Creates a td for each property
        for (let attrib in accepted[key]) {

            studentData = document.createElement("td");
            studentData.id = "student_" + key + "_" + attrib;
            studentData.innerHTML = accepted[key][attrib];
            //console.log("attrib : " + attrib);
            studentRow.appendChild(studentData);
        }

        tableContent.append(studentRow);
        //console.log("key " + key);
    }

    //console.log(accepted);
}

function getRates() {

    $.ajax({

        url: "https://api.coinpaprika.com/v1/coins",
        dataType: "JSON",

        success: function (data) {
            console.log("values " + data);

            header = [];
            accepted = [];

            // Iterates over the student list
            for (key in data) {
                //console.log("key : "+key);
                accepted.push(data[key]);
            }

            updateList(accepted);
        }
    });
}