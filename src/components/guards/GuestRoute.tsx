"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GuestRouteProps {
    children: React.ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard');
        }
    }, [user, loading, router]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    // If authenticated, don't render anything (redirect will happen)
    if (user) {
        return null;
    }

    // User is not authenticated, render the guest content
    return <>{children}</>;
};
