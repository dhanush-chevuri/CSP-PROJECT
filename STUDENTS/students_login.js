

function fetchuserdata() {
    var username = document.getElementById("username").value;

    var password = document.getElementById("password").value;

    console.log(username);

    fetch('http://localhost:3000/studentsdata') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {

            // Process the retrieved data
            // console.log(data);
            const x = Object.entries(data);

            console.log(x);

            for (let index = 0; index < x.length; index++) {
                const element = x[index][1];
                const tempdata = Object.entries(element);

                var test = true;

                if (tempdata[8][1] == username) {
                    if (tempdata[9][1] == password) {
                        login_teacher(tempdata[0][1]);
                        console.log("data send success");
                        window.open('students_home.html', '_self');
                        var test = false;
                    }
                }


            }


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Server is offline or there was a network error. Please try again later.");
        });
}




function login_teacher( data) {

    fetch('http://localhost:3000/LOGINdataSTU', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { data : data } )
    })
    .then(response => response.text())
    .then(message => {
        console.log(message);
    })
    .catch(error => console.error('Error:', error));

}






