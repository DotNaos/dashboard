"use client";

import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function LoginPage() {
    const supabase = useSupabaseClient();
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/weather");
        }
    }, [session, router]);

    return (
        <Card className="w-full max-w-screen-sm">
            <CardHeader className="text-3xl font-bold">Login</CardHeader>
            <CardBody className="min-w-max w-[640px]">
                <Auth
                    appearance={{
                        theme: ThemeSupa,
                        className: {
                            button: "login-button",
                            container: "login-container",
                            anchor: "login-anchor",
                            divider: "login-divider",
                            label: "login-label",
                            input: "login-input",
                            loader: "login-loader",
                            message: "login-message",
                        },
                    }}
                    providers={["google"]}
                    supabaseClient={supabase}
                />
            </CardBody>
        </Card>
    );
}
