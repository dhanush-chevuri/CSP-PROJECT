function fetchData() {
    fetch('http://localhost:3000/data') // Replace with your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the retrieved data
            console.log(data);
            console.log(typeof data);
            console.log(data[0].last_update);
            console.log( Object.entries(data).length );
            const x = Object.entries(data);
            console.log(x[0][1].country_id);
            // Here, you can update your webpage with the data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.getElementById('getDataButton').addEventListener('click', fetchData);