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
            alert("Server is offline or there was a network error. Please try again later.");
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

                var tableHTML = "<table border='1'><tr><th>DATA</th><th>DETAILS</th></tr>";


                var count = 1;

                for(var i = 0; i < len; i++)
                {
                    var temp = Object.entries(x[i][1])[11][1];
                    
                    if(temp != id)
                    {
                        continue;
                    }

                    console.log(i);


                    if( count >1)
                    {
                    tableHTML += "<table border='1'><tr><th>DATA</th><th>DETAILS</th></tr>";
                    }
                    else{
                        count++;
                    }


                    y = x[i][1];
                    z = Object.entries(y);
                    for( var j = 0; j < z.length ; j++)
                    {
                        t = z[j];
                        // console.log(z[0] + z[1]);
                        console.log(t[0] + t[1]);

                        tableHTML += "<tr><td>" + t[0] + "</td><td>" + t[1] + "</td></tr>";
                    }
                    tableHTML += "</table> <br>";

                }

            
                // Display the table
                document.getElementById("tableContainer").innerHTML = tableHTML;

    
    
            })
    
    
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert("Server is offline or there was a network error. Please try again later.");
            });
    


}
