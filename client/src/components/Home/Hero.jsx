import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <>
            <div className="bg-gradient-to-b from-purple-700 via-blue-700 to-pink-200 px-6 sm:py-20 py-10 font-[sans-serif] mt-10">
                <div className="max-w-screen-xl mx-auto text-center text-white">
                    <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-6">Welcome to Edulib</h1>
                    <p className="text-lg mb-12">Empower Your Learning Journey
                    Unlock access to a world of knowledge with our vast collection of free, high-quality educational resources. Whether you're a student, professional, or lifelong learner, we provide the tools you need to grow, succeed, and thrive. Join a community where learning is limitless, and opportunities are boundless. Dive into courses, explore interactive content, and take your skills to the next level—all for free, anytime, anywhere.</p>
                    <Link to={"/login"} className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</Link>
                </div>
            </div>
        </>
    );
}