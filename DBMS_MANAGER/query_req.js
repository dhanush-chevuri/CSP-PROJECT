

function submitForm() {
    var text = document.getElementById("textInput").value;
    
    fetch('http://localhost:3000/RUNQUERY', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { data : text } )
        
    })
    .then(response => response.text())
    .then(message => {
        console.log(message);
        alert("QUERY SUBMITTED!");
    })
    .catch(error => console.error('Error:', error));

}


