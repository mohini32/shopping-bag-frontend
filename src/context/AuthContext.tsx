"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const login = async (userData: User) => {
        // No manual token storage - cookie is set by backend
        setUser(userData);
        router.push('/dashboard');
    }
    const logout = async () => {
        // Call backend logout to clear cookie
        try {
            await fetch('http://localhost:5001/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Include cookies
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setUser(null);
        router.push('/auth/login');
    }
    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/profile', {
                credentials: 'include' // Include cookies automatically
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    };
    useEffect(() => {

        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};