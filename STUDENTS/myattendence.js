window.onload = function() {
    attTable();
};



function attTable() {


    var id = 1;

    fetch('http://localhost:3000/LOGINdataSTU') // Replace with your server URL
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
            alert("Server is offline or there was a network error. Please try again later.");
        });

    console.log(id);


    
    fetch('http://localhost:3000/SENDATTENDENCE') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            const x = Object.entries(data);

            // need to be updated
            console.log(x[id-1][1]);
            console.log(Object.entries(x[id-1][1]));
            // var element = Object.entries(x[id-1][1]);

            console.log(Object.entries(x[id-1][1])[1][1]);


            // Generate the table
            var tableHTML = "<table border='1'><tr><th>DATA</th><th>DETAILS</th></tr>";
            const element = x[id-1][1];

            const tempdata = Object.entries(element);

            var count = 0;

            for (var i = 0; i <  Object.entries(x[id-1][1])[1][1] +2 ; i++) {
        
                if(i>=2)
                {
                    if(tempdata[i][1] == "P")
                    {
                        count++;
                    }
                }
                tableHTML += "<tr><td>" + tempdata[i][0] + "</td><td>" + tempdata[i][1] + "</td></tr>";

            }
            tableHTML += "<tr><td>" + "PERCENTAGE" + "</td><td>" + (parseFloat((count/Object.entries(x[id-1][1])[1][1])).toFixed(2))*100 + "%" + "</td></tr>";

            tableHTML += "</table>";

            
            // Display the table
            document.getElementById("tableContainer").innerHTML = tableHTML;



        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });


}
