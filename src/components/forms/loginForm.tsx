"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { tokenUtils } from "@/app/utils";
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false); // Changed to false initially
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = tokenUtils.get();
            if (token) {
                setIsRedirecting(true);
                // router.push('/dashboard');
                try {
                    const response = await fetch('http://localhost:5001/api/', {
                        headers: { 'Authorization': token }
                    });
                    if (response.ok) {
                        tokenUtils.set(token);
                        router.replace('/admin');
                    }
                    else {
                        tokenUtils.remove();
                        setIsRedirecting(false);
                    }
                }
                catch (error) {
                    tokenUtils.remove();
                    setIsRedirecting(false);
                }
            }
        };
        checkAuth();
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include cookies
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Use AuthContext login (no manual token storage)
            // The cookie is automatically set by the backend
            router.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            // alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="sr-only">
                Email address
            </label>
            <input
                type="text"
                placeholder="Username"
                className="border px-3 py-2 rounded text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
                password
            </label>
            <input
                type="password"
                placeholder="Password"
                className="border px-3 py-2 rounded text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>

        </form>
    )
}
