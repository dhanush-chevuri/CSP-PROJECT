window.onload = function() {
    Tables();
};



function Tables() 
{
    
    fetch('http://localhost:3000/teacherdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });

        fetch('http://localhost:3000/SENDATTENDENCE') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            populateAttendanceTable(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });


        
        fetch('http://localhost:3000/studentsdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('studentContainer');
    
            data.forEach(student => {
                const studentDiv = document.createElement('div');
                studentDiv.classList.add('student');
    
                const studentInfo = `
                    <p>StudentID: ${student.student_id}</p>
                    <p>Name: ${student.first_name} ${student.last_name}</p>
                    <p>Date of Birth: ${new Date(student.date_of_birth).toLocaleDateString()}</p>
                    <p>Gender: ${student.gender}</p>
                    <p>Year in Engineering: ${student.year_in_engineering}</p>
                    <p>Address: ${student.address}</p>
                    <p>Phone Number: ${student.phone_number}</p>
                    <p>Username : ${student.USERNAME}</p>
                    <p>password : ${student.PASSWORD}</p>
                `;
    
                studentDiv.innerHTML = studentInfo;
    
                container.appendChild(studentDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });
    



}




function populateAttendanceTable(attendanceData) {
    var tableBody = document.getElementById("attendanceTable").getElementsByTagName("tbody")[0];
    attendanceData.forEach(student => {
        var row = tableBody.insertRow();
        row.insertCell().textContent = student.student_id;
        row.insertCell().textContent = student.days;
        for (var i = 1; i <= 50; i++) {
            row.insertCell().textContent = student['day' + i] || ''; // Insert empty string if day value is null
        }
    });
}

















function populateTable(teachersData) {
    var tableBody = document.getElementById("teachersTable").getElementsByTagName("tbody")[0];
    for (var i = 0; i < teachersData.length; i++) {
        var teacher = teachersData[i];
        var row = tableBody.insertRow(i);
        row.insertCell(0).textContent = teacher.teacher_id;
        row.insertCell(1).textContent = teacher.first_name;
        row.insertCell(2).textContent = teacher.last_name;
        row.insertCell(3).textContent = new Date(teacher.date_of_birth).toLocaleDateString();
        row.insertCell(4).textContent = teacher.gender;
        row.insertCell(5).textContent = teacher.subject_taught;
        row.insertCell(6).textContent = teacher.address;
        row.insertCell(7).textContent = teacher.phone_number;
        row.insertCell(8).textContent = teacher.USERNAME;
        row.insertCell(9).textContent = teacher.PASSWORD;
    }
}