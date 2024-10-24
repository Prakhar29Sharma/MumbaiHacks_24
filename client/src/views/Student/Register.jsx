import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    function validateEmail(element) {
        if (element.validity.typeMismatch) {
            element.setCustomValidity("Please enter a valid email id");
            element.reportValidity();
            return false;
        } else {
            element.setCustomValidity("");
            return true;
        }
    }

    function validatePassword(element) {
        if (element.value.length < 6) {
            element.setCustomValidity("Password length should be at least 6 characters");
            element.reportValidity();
            return false;
        } else {
            element.setCustomValidity("");
            return true;
        }
    }

    function validateConfirmPassword(element) {
        if (element.value !== password) {
            element.setCustomValidity("Passwords do not match");
            element.reportValidity();
            return false;
        } else {
            element.setCustomValidity("");
            return true;
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");
        const confirmPasswordField = document.getElementById("confirm-password");

        if (validateEmail(emailField) && validatePassword(passwordField) && validateConfirmPassword(confirmPasswordField)) {
            const data = { firstName, lastName, email, password };

            console.log("Registration data: ", data);
            
            // Make a post request to server

            axios({
                method: 'post',
                url: 'http://localhost:5000/api/auth/student/register',
                data: data,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    window.location.href = '/login';
                } else {
                    console.log(response.data.error);
                    setMessage('An error has occurred!');
                }
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    }

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    return (
        <>
            <div className="font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                        <div>
                            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                                Join Our Learning Community
                            </h2>
                            <p className="text-sm mt-6 text-gray-800">
                                Create an account to unlock access to quality educational resources and much more.
                            </p>
                            <p className="text-sm mt-12 text-gray-800">Already have an account? <Link to={"/login"} className="text-blue-600 font-semibold hover:underline ml-1">Sign in here</Link></p>
                        </div>

                        <form className="max-w-md md:ml-auto w-full">
                            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                                Sign Up
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <input id="firstName" name="firstName" type="text" onChange={handleInputChange(setFirstName)} required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="First Name" />
                                </div>
                                <div>
                                    <input id="lastName" name="lastName" type="text" onChange={handleInputChange(setLastName)} required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Last Name" />
                                </div>
                                <div>
                                    <input id="email" name="email" type="email" onChange={handleInputChange(setEmail)} autoComplete="email" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Email address" />
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" onChange={handleInputChange(setPassword)} autoComplete="new-password" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Password" />
                                </div>
                                <div>
                                    <input id="confirm-password" name="confirmPassword" type="password" onChange={handleInputChange(setConfirmPassword)} autoComplete="new-password" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Confirm Password" />
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button onClick={handleRegister} type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign Up
                                </button>
                            </div>

                            <p style={{ textAlign: 'left', fontSize: '15px', fontWeight: 'bold', color: 'red', marginTop: '10px' }} className="message">{message}</p>

                            <div className="space-x-6 flex justify-center mt-8">
                            <button type="button"
                                className="border-none outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 512 512">
                                <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" data-original="#fbbd00" />
                                <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" data-original="#0f9d58" />
                                <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" data-original="#31aa52" />
                                <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" data-original="#3c79e6" />
                                <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" data-original="#cf2d48" />
                                <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" data-original="#eb4132" />
                                </svg>
                            </button>
                                <button type="button" className="border-none outline-none p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all" aria-label="Register with GitHub">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 3.003-.404c1.02.005 2.045.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.814 1.102.814 2.222 0 1.606-.014 2.9-.014 3.292 0 .322.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
