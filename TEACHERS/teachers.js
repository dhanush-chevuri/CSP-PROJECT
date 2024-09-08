

function fetchuserdata() {
    var username = document.getElementById("username").value;

    var password = document.getElementById("password").value;

    console.log(username);

    fetch('http://localhost:3000/teacherdata') // Replace with your server URL
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

            for (let index = 0; index < x.length; index++) {
                const element = x[index][1];
                const tempdata = Object.entries(element);


                if (tempdata[8][1] == username) {
                    if (tempdata[9][1] == password) {
                        login_teacher(tempdata[0][1]);
                        console.log("data send success");
                        window.open('teachers_home.html', '_self');
                        
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

    fetch('http://localhost:3000/LOGINdata', {
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






