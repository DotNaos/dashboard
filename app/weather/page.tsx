"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import {
    CircleGauge,
    Droplet,
    MoveDown,
    MoveUp,
    Navigation,
    Wind,
} from "lucide-react";

interface CurrentWeather {
    name: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
    }[];
}

interface ForecastItem {
    dt: number;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
    wind: {
        speed: number;
    };
}

interface ForecastData {
    city: {
        name: string;
    };
    list: ForecastItem[];
}

type DailyForecast = {
    date: number;
    min: number;
    max: number;
    description: string;
    wind: number;
};

export default function WeatherWidget(): JSX.Element {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
        null
    );
    const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
        null
    );
    const [cityName, setCityName] = useState<string>("Current Location");
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                () => {
                    // Default fallback if user denies
                    setCoords({ lat: 47.3769, lon: 8.5417 });
                }
            );
        } else {
            // If no geolocation, fallback to Zurich, Switzerland
            setCoords({ lat: 47.3769, lon: 8.5417 });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!coords) return;

            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`
            );
            const currentData: CurrentWeather = await currentRes.json();
            setCurrentWeather(currentData);
            if (currentData.name) setCityName(currentData.name);

            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`
            );
            const forecastData: ForecastData = await forecastRes.json();
            if (forecastData.city && forecastData.city.name)
                setCityName(forecastData.city.name);

            const dailyMap: Record<
                string,
                {
                    temps: number[];
                    winds: number[];
                    descriptions: string[];
                    date: number;
                }
            > = {};

            forecastData.list.forEach((item) => {
                const dateObj = new Date(item.dt * 1000);
                const dayStr = dateObj.toLocaleDateString("de-CH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });
                if (!dailyMap[dayStr]) {
                    dailyMap[dayStr] = {
                        temps: [],
                        winds: [],
                        descriptions: [],
                        date: item.dt,
                    };
                }
                dailyMap[dayStr].temps.push(item.main.temp);
                dailyMap[dayStr].winds.push(item.wind.speed);
                dailyMap[dayStr].descriptions.push(item.weather[0].description);
            });

            const sortedDays = Object.keys(dailyMap)
                .sort((a, b) => dailyMap[a].date - dailyMap[b].date)
                .slice(1, 6);

            const dailyArr: DailyForecast[] = sortedDays.map((dayKey) => {
                const dayData = dailyMap[dayKey];
                const min = Math.round(Math.min(...dayData.temps));
                const max = Math.round(Math.max(...dayData.temps));
                const wind = Math.round(
                    dayData.winds.reduce((a, b) => a + b, 0) /
                        dayData.winds.length
                );
                const desc = dayData.descriptions[0];
                return {
                    date: dayData.date,
                    min,
                    max,
                    description: desc,
                    wind,
                };
            });

            setDailyForecast(dailyArr);
        };
        fetchData();
    }, [apiKey, coords]);

    if (!currentWeather || dailyForecast.length === 0) {
        return (
            <Card className="flex items-center justify-center bg-black text-white w-[700px] h-[300px] rounded-xl">
                Loading...
            </Card>
        );
    }

    const currentTemp = Math.round(currentWeather.main.temp) + "°C";
    const pressure = currentWeather.main.pressure + " hPa";
    const wind = Math.round(currentWeather.wind.speed) + " m/s";
    const humidity = currentWeather.main.humidity + "%";
    const conditions = currentWeather.weather[0].description;

    const todaysHigh = dailyForecast[0]?.max + "°";
    const todaysLow = dailyForecast[0]?.min + "°";

    return (
        <div className="px-overlay py-default overlay !bg-dark border-overlay border-2 rounded-overlay flex flex-col gap-default">
            {/* Header  */}
            <div className="flex items-center gap-default">
                <Navigation className="text-cyan-300" />
                <span className="text-2xl font-bold uppercase">{cityName}</span>
            </div>

            {/* Weather */}
            <div className="flex flex-row gap-overlay">
                {/* Today Detail */}
                <div className="flex flex-col items-start justify-end gap-default">
                    {/* Conditions icon */}

                    {/* TODO: Replace with photo from api */}
                    {/* <div className="text-sm opacity-80">{conditions}</div> */}
                    <div className="text-7xl">⛅</div>

                    <div className="text-9xl font-bold ">
                        51°F
                        {/* {currentTemp} */}
                    </div>

                    <div className="flex text-medium font-semibold opacity-80 gap-default text-white/90">
                        <span className="weather-measurement">
                            <MoveUp className="weather-feature-icon" />
                            {todaysHigh}
                        </span>
                        <span className="weather-measurement">
                            <MoveDown className="weather-feature-icon" />
                            {todaysLow}
                        </span>
                        <span className="weather-measurement">
                            <Droplet className="weather-feature-icon" />
                            {humidity}
                        </span>
                        <span className="weather-measurement">
                            <Wind className="weather-feature-icon" />
                            {wind}
                        </span>
                        <span className="weather-measurement">
                            <CircleGauge className="weather-feature-icon" />
                            {pressure}
                        </span>
                    </div>
                </div>

                {/* Forecast */}
                <div>
                    {dailyForecast.map((day, i) => {
                        const dateObj = new Date(day.date * 1000);
                        const dayNumStr = dateObj.toLocaleDateString("us", {
                            day: "numeric",
                        });
                        const dayStr = dateObj.toLocaleDateString("us", {
                            weekday: "short",
                        });
                        const monthStr = dateObj.toLocaleDateString("us", {
                            month: "short",
                        });
                        const hi = day.max + "°C";
                        const lo = day.min + "°C";
                        const w = day.wind + " m/s";

                        return (
                            <div
                                key={i}
                                className="py-default flex flex-row gap-overlay"
                            >
                                <div className="flex items-center gap-2 text-3xl font-semibold">
                                    {dayNumStr}
                                    <div className="flex flex-col items-start text-xs opacity-80 uppercase">
                                        <span>{monthStr}</span>
                                        <span>{dayStr}</span>
                                    </div>
                                </div>
                                <div className="weather-measurement gap-2 font-semibold capitalize">
                                    <span className="text-4xl">☁️</span>{" "}
                                    {day.description}
                                </div>
                                <div className="flex flex-col items-center text-xs opacity-80 uppercase">
                                    <span>{hi}</span>
                                    <span>{lo}</span>
                                </div>
                                <div>/</div>
                                <div>{w}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
