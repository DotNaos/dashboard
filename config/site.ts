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
};
