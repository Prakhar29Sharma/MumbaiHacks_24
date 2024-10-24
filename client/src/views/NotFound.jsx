import React from 'react';
import Navbar from '../components/Home/Navbar';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
                Go Back Home
            </Link>
            </div>
        </>
    );
}
