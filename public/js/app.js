fetch('http://localhost:3000/weather?address=India', {
    method: 'GET',
}).then(response => {
    return response.json();
}).then(data => {
   if (data.error) {
        console.error('Error:', data.error);
    }
    else {
        console.log('Weather Data:', data);
        const { location, forecast, address } = data;
        console.log(`Forecast: ${forecast}`);
        console.log(`Address: ${address}`);
    }
}).catch(error => {
    console.error('Error fetching the puzzle:', error);
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const search = document.querySelector('input').value; // Get the value of the input field
    document.querySelector('#message-1').textContent = 'Loading...'; // Display loading message
    fetch(`/weather?address=${encodeURIComponent(search)}`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.error) {
            document.querySelector('#message-1').textContent = data.error;
            document.querySelector('#message-2').textContent = '';
        } else {
            document.querySelector('#message-1').textContent = `Location: ${data.address}`;
            document.querySelector('#message-2').textContent = `Forecast: ${data.forecast}`;
        }
    }).catch(error => {
        console.error('Error fetching the weather:', error);
    });
}
);