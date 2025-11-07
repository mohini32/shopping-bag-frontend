"use client";

import React, { useState } from "react";
import { apiFetch } from '../../utils/api';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiFetch('auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error:', errorData);
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            // Cookie is automatically set by backend
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Registration error:', error);
            // alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="sr-only">
                name
            </label>
            <input
                type="text"
                placeholder="Username"
                className="border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />


            <label htmlFor="email" className="sr-only">
                Email address
            </label>
            <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
                password
            </label>
            <input
                type="password"
                placeholder="Password"
                className="border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            >
                {isLoading ? 'Registering...' : 'Register'}
            </button>

        </form>
    )
}
