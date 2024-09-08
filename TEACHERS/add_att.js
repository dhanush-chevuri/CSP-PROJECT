
window.onload = function() {
    createCheckboxes();
};


// Define a function to handle form submission
function submitForm() {
    // Get all checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Get values of checked checkboxes
    var checkedValues = [];
    checkboxes.forEach(function (checkbox) {
        checkedValues.push(checkbox.id);
    });

    // Output checked values (for demonstration)
    console.log("Checked values: " + checkedValues.join(", "));

    var attendenceDay = document.getElementById("attendanceDay").value;
    
    // Get the value of the "Student attendence visibility" input
    var studentVisibility = document.getElementById("studentAttendanceVisibility").value;

    // Display the values (you can do anything you want with them)
    console.log("Attendence day:", attendenceDay);
    console.log("Student attendence visibility:", studentVisibility);

    console.log(checkedValues);

    
    data = [];

    data.push(id);

    data.push(attendenceDay);
    data.push(studentVisibility);

    
    data.push(checkedValues);

    data.push(allstu);

  

    console.log(data);

    update_att( data);

    alert("Attendence Updates");





}

var id = 1;

var allstu;



function createCheckboxes() {

    allstu = [];


    fetch('http://localhost:3000/LOGINdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
            var x = Object.entries(data);

            x = Object.entries(x[0][1]);

            id = x[0][1];

            // [Array(2)]0: (2) ['0', {…}]length: 1[[Prototype]]: Array(0)

        })


        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });




    fetch('http://localhost:3000/LOGINdataTEASTU') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
            var x = Object.entries(data);

            const len = (x.length);

            for (var i = 0; i < len; i++) {

                
                var temp = Object.entries(x[i][1])[11][1];

                if( temp != id)
                {
                    continue;
                }

                console.log(temp);

                y = x[i][1];
                z = Object.entries(y);


                t = z[0];
                console.log(t[0] + t[1]);


                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = (i+1); // Set an ID for each checkbox

                var temps = (i+1);

                allstu.push(temps);

                // Create a label for the checkbox
                var label = document.createElement('label');
                label.htmlFor = 'student_id' + (i+1);
                label.appendChild(document.createTextNode('student_id' + (i+1)));

                // Append the checkbox and label to the container
                var container = document.getElementById('checkboxContainer');
                container.appendChild(checkbox);
                container.appendChild(label);

                // Add a line break for better readability
                container.appendChild(document.createElement('br'));





            }

        })


        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });



}





function update_att( data) {

    data = { data : data };

    // console.log(data);

    fetch('http://localhost:3000/ATTENDENCEUPDATE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then(response => response.text())
    .then(message => {
        console.log(message);
    })
    .catch(error => console.error('Error:', error));

}