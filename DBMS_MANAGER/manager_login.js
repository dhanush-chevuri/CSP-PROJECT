

function login()
{
    var username = document.getElementById("username").value;

    var password = document.getElementById("password").value;

    console.log("Login", username, password);

    if( username == "1234" && password == "1234" )
    {
        
        alert("login sucessfully");
        window.open('tables_view.html');
    }

}