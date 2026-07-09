async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Enter a city name");
        return;
    }

    try {
        // Step 1: Get coordinates
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById("weatherResult").innerHTML = "❌ City not found";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Step 2: Get weather
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        document.getElementById("weatherResult").innerHTML = `
            🌍 ${geoData.results[0].name} <br>
            🌡️ Temp: ${weatherData.current_weather.temperature}°C <br>
            💨 Wind: ${weatherData.current_weather.windspeed} km/h
        `;
    } catch (error) {
        console.error(error);
        document.getElementById("weatherResult").innerHTML = "⚠️ Error fetching data";
    }
}