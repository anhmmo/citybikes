import React from "react";
import "./WeatherBox.css";
function WeatherBox({ closeWeatherBox, weatherData, weatherModal }) {
  console.log(weatherData);
  if (weatherData.current) {
    return (
      <div className="weather-box">
        <i onClick={closeWeatherBox} className="fas fa-times-circle"></i>
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <img src={weatherData.current.weather_icons[0]} alt="weather-icon" />
          <h1>{weatherData.current.temperature}°C</h1>
          <div className="weather-alert">
            {weatherData.current.weather_descriptions[0]}
          </div>
          <p>
            Feels like: {weatherData.current.feelslike} °C. Wind speed:{" "}
            {weatherData.current.wind_speed}
            km/h. Pressure: {weatherData.current.pressure} hPa. Humidity:{" "}
            {weatherData.current.humidity} % UV-index:{" "}
            {weatherData.current.uv_index}. Visibility:{" "}
            {weatherData.current.visibility} km
          </p>

          <p style={{ color: "#eb6e4b" }}>{weatherData.location.localtime}</p>
        </div>
        <div className="weather-map">
          {weatherModal.location.toLowerCase() === "helsinki" ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254235.4778760842!2d24.713789178969495!3d60.14406825283749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bc796210691%3A0xcd4ebd843be2f763!2sHelsinki%2C%20Suomi!5e0!3m2!1sfi!2s!4v1600104664311!5m2!1sfi!2s"
              width={600}
              height={450}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="map"
            />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252883.21294166907!2d24.689615517340762!3d60.31884460653698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469207b83a3845b5%3A0xe2b7cd7632a1804f!2sVantaa%2C%20Suomi!5e0!3m2!1sfi!2s!4v1600111762447!5m2!1sfi!2s"
              width="600"
              height="450"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              title="map"
            ></iframe>
          )}
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default WeatherBox;
