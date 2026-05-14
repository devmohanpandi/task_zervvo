import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Weather.module.scss";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const Weather = () => {
  const [city, setCity] = useState("Madurai");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (lat = null, lon = null) => {
    try {
      setLoading(true);
      setError("");

      let weatherUrl = "";
      let forecastUrl = "";

      // Geo Location API
      if (lat && lon) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      }

      // City Search API
      else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      }

      const weatherRes = await axios.get(weatherUrl);

      const forecastRes = await axios.get(forecastUrl);

      setWeather(weatherRes.data);

      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00"),
      );

      setForecast(dailyForecast);
    } catch (err) {
      setError("Unable to fetch weather data");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        getWeather(latitude, longitude);
      },
      () => {
        getWeather();
      },
    );
  }, []);
  const handleSearch = () => {
    if (!search.trim()) return;
    setCity(search);
    getWeather();
  };
  useEffect(() => {
    if (search) {
      setCity(search);
    }
  }, [search]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Weather Dashboard</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p className={styles.message}>Loading...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {weather && !loading && (
          <>
            <div className={styles.weatherCard}>
              <div>
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>

                <p className={styles.condition}>{weather.weather[0].main}</p>
              </div>

              <div className={styles.temp}>
                {Math.round(weather.main.temp)}°C
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailCard}>
                <span>Humidity</span>
                <h3>{weather.main.humidity}%</h3>
              </div>

              <div className={styles.detailCard}>
                <span>Wind Speed</span>
                <h3>{weather.wind.speed} km/h</h3>
              </div>

              <div className={styles.detailCard}>
                <span>Feels Like</span>
                <h3>{Math.round(weather.main.feels_like)}°C</h3>
              </div>
            </div>

            <div className={styles.forecastSection}>
              <h2>5-Day Forecast</h2>

              <div className={styles.forecastList}>
                {forecast.map((item, index) => (
                  <div className={styles.forecastCard} key={index}>
                    <p>
                      {new Date(item.dt_txt).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>

                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt="weather-icon"
                    />

                    <h3>{Math.round(item.main.temp)}°C</h3>

                    <span>{item.weather[0].main}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
