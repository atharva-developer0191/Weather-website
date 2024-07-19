const apiKey = 'gskstcqie5qfdjhole6hj33g6o6lub62ost5gfe2';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://www.meteosource.com/api/v1/free/find_places?text=${city}&language=en&key=${apiKey}`;

    try {
        console.log(`Fetching location data from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Received location data:', data);

        if (!data || data.length === 0) {
            alert('No locations found.');
            return;
        }

        // Select the first location (you can enhance this by letting the user choose)
        const selectedLocation = data[0];
        console.log('Selected location:', selectedLocation);

        const weatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${selectedLocation.place_id}&sections=current%2Chourly&language=en&units=auto&key=${apiKey}`;
        console.log(`Fetching weather data from: ${weatherUrl}`);
        fetchWeatherData(weatherUrl, selectedLocation);
    } catch (error) {
        console.error('Failed to fetch location data:', error);
        alert('Failed to fetch location data.');
    }
}

async function fetchWeatherData(url, location) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Received weather data:', data);
        displayWeather(data, location);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data, location) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    console.log('Processing data:', data);

    // Check if data contains necessary properties
    if (!data || !data.current) {
        weatherDisplay.innerHTML = `<p>ERROR: No weather data found</p>`;
        return;
    }

    const temperature = data.current.temperature !== undefined ? data.current.temperature : 'Unknown';
    const wind_speed = data.current.wind.speed !== undefined ? data.current.wind.speed : 'Unknown';
    const weatherMain = data.current.weather !== undefined ? data.current.weather : 'Unknown';
    const description = data.current.summary !== undefined ? data.current.summary : 'Unknown';
    const locationName = location.name || 'Unknown';
    const country = location.country || 'Unknown';

    console.log('Temperature:', temperature);
    console.log('Weather:', weatherMain);
    console.log('Wind Speed:', wind_speed);
    console.log('Country:', country);
    console.log('Name:', locationName);
    console.log('Weather Main:', weatherMain);
    console.log('Description:', description);

    const weatherHTML = `
        <h2>Weather in ${locationName}, ${country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
        <p>Wind: ${wind_speed} m/s</p>
    `;
    weatherDisplay.innerHTML = weatherHTML;
}
