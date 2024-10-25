import React, { useState } from 'react';
import axios from 'axios';

const TranslationComponent = () => {
    const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/translate', {
                text,
                targetLanguage,
            });
            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Error translating:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100"> {/* Tailwind CSS classes */}
            <h1 className="text-2xl font-bold mb-4">Translation System</h1>
            <textarea 
                className="w-full h-24 p-2 border border-gray-300 rounded mb-2" // Add Tailwind styles
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <select 
                className="w-full mb-2 p-2 border border-gray-300 rounded" // Add Tailwind styles
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
            >
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                {/* Add more languages as needed */}
            </select>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" // Tailwind styles for button
                onClick={handleTranslate}
            >
                Translate
            </button>
            <h2 className="text-lg font-semibold mt-4">Translated Text:</h2>
            <p className="border border-gray-300 p-2 rounded w-full mt-2">{translatedText}</p>
        </div>
    );
};

export default TranslationComponent;
