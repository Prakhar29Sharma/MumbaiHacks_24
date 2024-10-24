import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className="font-sans tracking-wide bg-[#213343] py-10 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-5">
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Our Story</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Blog</Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Users</h4>
                    <ul className="space-y-5">
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Student</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Educators</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Evaluators</Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Technology</h4>
                    <ul className="space-y-5">
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">LLAMA3.1</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">MERN</Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h4 className="text-[#FFA726] font-semibold text-lg mb-6">Company</h4>
                    <ul className="space-y-5">
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Accessibility</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">About</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Contact</Link>
                        </li>
                        <li>
                        <Link to={"/"} className="hover:text-[#FFA726] text-gray-300 text-[15px] transition-all">Learn more</Link>
                        </li>
                    </ul>
                    </div>
                </div>

                <div className="border-t text-center border-[#6b5f5f] pt-8 mt-8">
                    <p className="text-gray-300 text-[15px]">
            © Edulib. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}