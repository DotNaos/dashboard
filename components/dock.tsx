"use client";

import { Button, Link } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

export default function Dock() {
    return (
        <div className="absolute bottom-0 left-0 right-0">
            <div className="flex justify-center p-6">
                <div className="flex items-center gap-default overlay rounded-3xl px-overlay py-default">
                    {siteConfig.navItems.map((item) => (
                        <Button
                            key={item.label}
                            isIconOnly
                            as={Link}
                            className="w-16 h-16 app-icon"
                            href={item.href}
                        >
                            {item.icon}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
