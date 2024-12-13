"use client";

import { Button } from "@nextui-org/react";
import { ImagePlay } from "lucide-react";
import React, { useState, useEffect } from "react";

interface BackgroundImageProps {
    children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
    const [imageUrl, setImageUrl] = useState<string>("");

    const fetchImage = async () => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            );

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();

            if (data.urls && data.urls.full) {
                setImageUrl(data.urls.full);
            } else {
                console.error("Image URL not found in the response:", data);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div
            className="relative flex flex-col items-center min-h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <Button
                isIconOnly
                className="absolute top-4 right-4 overlay rounded-full"
                size="lg"
                onPress={fetchImage}
            >
                <ImagePlay />
            </Button>
            {children}
        </div>
    );
};

export default BackgroundImage;
