window.onload = function() {
    personalTable();
};



function personalTable() {


    var id = 1;

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


    
    fetch('http://localhost:3000/teacherdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            const x = Object.entries(data);

            // Generate the table
            var tableHTML = "<table border='1'><tr><th>DATA</th><th>DETAILS</th></tr>";
            const element = x[id-1][1];

            const tempdata = Object.entries(element);

            for (var i = 0; i <  tempdata.length -2 ; i++) {
        
                
                tableHTML += "<tr><td>" + tempdata[i][0] + "</td><td>" + tempdata[i][1] + "</td></tr>";

            }
            tableHTML += "</table>";

            
            // Display the table
            document.getElementById("tableContainer").innerHTML = tableHTML;



        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });


}
