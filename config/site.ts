export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Dashboard",
    description: "A dashboard for your daily needs",
    navItems: [
        {
            label: "Weather",
            icon: "⛅",
            href: "/weather",
        },
        {
            label: "Food Stock",
            icon: "🍔",
            href: "/food",
        },
        {
            label: "Todo",
            icon: "📝",
            href: "/todo",
        },
    ],

    weatherConditions: [
        {
            group: "Thunderstorm",
            conditions: [
                { id: 200, icon: "⛈️", description: "Thunderstorm with light rain" },
                { id: 201, icon: "⛈️", description: "Thunderstorm with rain" },
                { id: 202, icon: "⛈️", description: "Thunderstorm with heavy rain" },
                { id: 210, icon: "🌩️", description: "Light thunderstorm" },
                { id: 211, icon: "🌩️", description: "Thunderstorm" },
                { id: 212, icon: "🌩️", description: "Heavy thunderstorm" },
                { id: 221, icon: "🌩️", description: "Ragged thunderstorm" },
                { id: 230, icon: "🌩️", description: "Thunderstorm with light drizzle" },
                { id: 231, icon: "🌩️", description: "Thunderstorm with drizzle" },
                { id: 232, icon: "🌩️", description: "Thunderstorm with heavy drizzle" },
            ],
        },
        {
            group: "Drizzle",
            conditions: [
                { id: 300, icon: "🌧️", description: "Light intensity drizzle" },
                { id: 301, icon: "🌧️", description: "Drizzle" },
                { id: 302, icon: "🌧️", description: "Heavy intensity drizzle" },
                { id: 310, icon: "🌧️", description: "Light intensity drizzle rain" },
                { id: 311, icon: "🌧️", description: "Drizzle rain" },
                { id: 312, icon: "🌧️", description: "Heavy intensity drizzle rain" },
                { id: 313, icon: "🌧️", description: "Shower rain and drizzle" },
                { id: 314, icon: "🌧️", description: "Heavy shower rain and drizzle" },
                { id: 321, icon: "🌧️", description: "Shower drizzle" },
            ],
        },
        {
            group: "Rain",
            conditions: [
                { id: 500, icon: "🌧️", description: "Light rain" },
                { id: 501, icon: "🌧️", description: "Moderate rain" },
                { id: 502, icon: "🌧️", description: "Heavy intensity rain" },
                { id: 503, icon: "🌧️", description: "Very heavy rain" },
                { id: 504, icon: "🌧️", description: "Extreme rain" },
                { id: 511, icon: "🌧️", description: "Freezing rain" },
                { id: 520, icon: "🌧️", description: "Light intensity shower rain" },
                { id: 521, icon: "🌧️", description: "Shower rain" },
                { id: 522, icon: "🌧️", description: "Heavy intensity shower rain" },
                { id: 531, icon: "🌧️", description: "Ragged shower rain" },
            ],
        },
        {
            group: "Snow",
            conditions: [
                { id: 600, icon: "❄️", description: "Light snow" },
                { id: 601, icon: "❄️", description: "Snow" },
                { id: 602, icon: "❄️", description: "Heavy snow" },
                { id: 611, icon: "❄️", description: "Sleet" },
                { id: 612, icon: "❄️", description: "Light shower sleet" },
                { id: 613, icon: "❄️", description: "Shower sleet" },
                { id: 615, icon: "🌨️", description: "Light rain and snow" },
                { id: 616, icon: "🌨️", description: "Rain and snow" },
                { id: 620, icon: "🌨️", description: "Light shower snow" },
                { id: 621, icon: "🌨️", description: "Shower snow" },
                { id: 622, icon: "🌨️", description: "Heavy shower snow" },
            ],
        },
        {
            group: "Atmosphere",
            conditions: [
                { id: 701, icon: "🌫️", description: "Mist" },
                { id: 711, icon: "🌫️", description: "Smoke" },
                { id: 721, icon: "🌫️", description: "Haze" },
                { id: 731, icon: "🌫️", description: "Sand, dust whirls" },
                { id: 741, icon: "🌫️", description: "Fog" },
                { id: 751, icon: "🌫️", description: "Sand" },
                { id: 761, icon: "🌫️", description: "Dust" },
                { id: 762, icon: "🌫️", description: "Volcanic ash" },
                { id: 771, icon: "🌫️", description: "Squalls" },
                { id: 781, icon: "🌪️", description: "Tornado" },
            ],
        },
        {
            group: "Clear",
            conditions: [
                { id: 800, icon: "☀️", description: "Clear sky" },
            ],
        },
        {
            group: "Clouds",
            conditions: [
                { id: 801, icon: "🌤️", description: "Few clouds" },
                { id: 802, icon: "⛅", description: "Scattered clouds" },
                { id: 803, icon: "🌥️", description: "Broken clouds" },
                { id: 804, icon: "☁️", description: "Overcast clouds" },
            ],
        },
    ],
    // weatherIcons: "☁️⛅⛈️🌤️🌥️🌦️🌧️🌨️🌩️🌫️❄️🌪️🌈⚡💧☀️🌑🌒🌓🌔🌕🌖🌗🌘🌙🌊"
};
