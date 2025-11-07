import React from 'react'
import { RegisterForm } from '@/components/forms/registerForm';
import { GuestRoute } from '@/components/guards/GuestRoute';

export default function RegisterPage() {
    return (
        <GuestRoute>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <RegisterForm />
            </div>
        </GuestRoute>
    )
}
