"use client";

import { useAuth } from '@/context/AuthContext';

export const DashboardContent = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Dashboard, {user?.name}!
            </h1>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Profile</h3>
              <p className="text-blue-700">Email: {user?.email}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Orders</h3>
              <p className="text-green-700">View your order history</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Cart</h3>
              <p className="text-purple-700">Manage your shopping cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
