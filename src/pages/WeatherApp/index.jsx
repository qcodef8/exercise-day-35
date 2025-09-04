import { useState, useEffect } from "react";
import styles from "./WeatherApp.module.css";

function WeatherApp() {
    const [selectedCity, setSelectedCity] = useState("hanoi");
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");

    const weatherData = {
        hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
        hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
        danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
    };

    const [currentWeather, setCurrentWeather] = useState(weatherData.hanoi);

    // Update time and greeting every minute
    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const now = new Date();
            const hours = now.getHours();

            // Format time
            const timeString = now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            setCurrentTime(timeString);

            // Set greeting based on time
            if (hours < 12) {
                setGreeting("Good Morning");
            } else if (hours < 17) {
                setGreeting("Good Afternoon");
            } else {
                setGreeting("Good Evening");
            }
        };

        updateTimeAndGreeting();
        const interval = setInterval(updateTimeAndGreeting, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const handleCityChange = (e) => {
        const cityKey = e.target.value;
        setSelectedCity(cityKey);
        setCurrentWeather(weatherData[cityKey]);
    };

    const refreshWeather = () => {
        const cityKey = selectedCity;
        const current = weatherData[cityKey];

        // Random temperature change (±5 degrees)
        const tempChange = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const newTemp = Math.max(15, Math.min(40, current.temp + tempChange)); // Limit between 15-40°C

        // Random humidity change (±5%)
        const humidityChange = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const newHumidity = Math.max(
            30,
            Math.min(95, current.humidity + humidityChange)
        ); // Limit between 30-95%

        setCurrentWeather({
            ...current,
            temp: newTemp,
            humidity: newHumidity,
        });
    };

    const getWindSpeed = () => {
        return (Math.random() * 10 + 2).toFixed(1); // Random wind speed between 2-12 mph
    };

    const getFeelsLike = () => {
        return currentWeather.temp + Math.floor(Math.random() * 6) - 3; // ±3 degrees from actual temp
    };

    const dailyForecast = [
        {
            day: "Today",
            temp: currentWeather.temp,
            weather: currentWeather.weather,
        },
        {
            day: "Tue",
            temp: currentWeather.temp + Math.floor(Math.random() * 8) - 4,
            weather: "Mist",
        },
        {
            day: "Wed",
            temp: currentWeather.temp + Math.floor(Math.random() * 8) - 4,
            weather: "Sunny",
        },
        {
            day: "Thu",
            temp: currentWeather.temp + Math.floor(Math.random() * 8) - 4,
            weather: "Rainy",
        },
        {
            day: "Fri",
            temp: currentWeather.temp + Math.floor(Math.random() * 8) - 4,
            weather: "Rainy",
        },
        {
            day: "Sat",
            temp: currentWeather.temp + Math.floor(Math.random() * 8) - 4,
            weather: "Mist",
        },
    ];

    const hourlyForecast = [
        {
            time: "1 PM",
            temp: currentWeather.temp,
            weather: currentWeather.weather,
        },
        { time: "2 PM", temp: currentWeather.temp + 1, weather: "Rainy" },
        { time: "3 PM", temp: currentWeather.temp + 1, weather: "Rainy" },
        {
            time: "4 PM",
            temp: currentWeather.temp,
            weather: currentWeather.weather,
        },
        { time: "5 PM", temp: currentWeather.temp + 1, weather: "Rainy" },
        { time: "6 PM", temp: currentWeather.temp + 1, weather: "Rainy" },
    ];

    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className={styles.weatherContainer}>
            <div className={styles.weatherDashboard}>
                {/* Main Weather Section */}
                <div className={styles.mainWeatherSection}>
                    <div className={styles.cityInfo}>
                        <span className={styles.cityName}>
                            {currentWeather.city}
                        </span>
                        <span className={styles.currentDate}>
                            {currentDate}
                        </span>
                    </div>

                    <div className={styles.temperatureDisplay}>
                        <div className={styles.mainTemp}>
                            <span className={styles.tempValue}>
                                {currentWeather.temp}°
                            </span>
                            <span className={styles.weatherCondition}>
                                {currentWeather.weather}
                            </span>
                        </div>

                        <div className={styles.weatherDetails}>
                            <div className={styles.weatherDetail}>
                                <span className={styles.weatherIcon}>💨</span>
                                <span className={styles.detailText}>
                                    {getWindSpeed()} mph
                                </span>
                            </div>
                            <div className={styles.weatherDetail}>
                                <span className={styles.weatherIcon}>💧</span>
                                <span className={styles.detailText}>
                                    {currentWeather.humidity}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Forecast Section */}
                <div className={styles.dailyForecastSection}>
                    {dailyForecast.map((forecast, index) => (
                        <div
                            key={index}
                            className={`${styles.forecastCard} ${
                                index === 0 ? styles.todayCard : ""
                            }`}>
                            <div className={styles.forecastDay}>
                                {forecast.day}
                            </div>
                            <div className={styles.forecastTemp}>
                                {forecast.temp}°
                            </div>
                            <div className={styles.forecastWeather}>
                                {forecast.weather}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Panel */}
                <div className={styles.rightPanel}>
                    <div className={styles.greetingSection}>
                        <h2 className={styles.greeting}>{greeting}</h2>
                        <div className={styles.currentTime}>{currentTime}</div>
                    </div>

                    <div className={styles.miniWeatherSummary}>
                        <div className={styles.miniTemp}>
                            {currentWeather.temp}°
                        </div>
                        <div className={styles.miniDetails}>
                            <span>{getWindSpeed()} mph</span>
                            <span>{currentWeather.humidity}%</span>
                        </div>
                        <div className={styles.feelsLike}>
                            Feels like {getFeelsLike()}°
                        </div>
                        <div className={styles.miniWeather}>
                            {currentWeather.weather}
                        </div>
                    </div>

                    <div className={styles.hourlyForecastSection}>
                        <h3 className={styles.hourlyTitle}>Hourly Forecast</h3>
                        <div className={styles.hourlyGrid}>
                            {hourlyForecast.map((hour, index) => (
                                <div key={index} className={styles.hourlyCard}>
                                    <div className={styles.hourlyTime}>
                                        {hour.time}
                                    </div>
                                    <div className={styles.hourlyTemp}>
                                        {hour.temp}°
                                    </div>
                                    <div className={styles.hourlyWeather}>
                                        {hour.weather}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className={styles.controlsSection}>
                <div className={styles.citySelector}>
                    <label htmlFor="citySelect" className={styles.cityLabel}>
                        Chọn thành phố:
                    </label>
                    <select
                        id="citySelect"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className={styles.citySelect}>
                        <option value="hanoi">Hà Nội</option>
                        <option value="hcm">TP.HCM</option>
                        <option value="danang">Đà Nẵng</option>
                    </select>
                </div>

                <button
                    onClick={refreshWeather}
                    className={styles.refreshButton}>
                    <span className={styles.refreshIcon}>🔄</span>
                    Làm mới
                </button>
            </div>
        </div>
    );
}

export default WeatherApp;
