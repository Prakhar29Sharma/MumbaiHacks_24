import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you with DSA?" }]);
    const [input, setInput] = useState("");
    const [transcriptSummary, setTranscriptSummary] = useState("");
    const chatEndRef = useRef(null);

    const toggleChatbot = () => setIsOpen(!isOpen);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const userMessage = { sender: "user", text: input };
            setMessages([...messages, userMessage]);
            setInput("");

            try {
                // Handle general queries to your backend chat system
                const response = await axios.post("http://localhost:5000/chat", { message: input });
                const botMessage = { sender: "bot", text: response.data.reply };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error("Error sending message:", error);
                const botMessage = { sender: "bot", text: "Sorry, something went wrong." };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        }
    };

    const fetchTranscriptSummary = async () => {
        const videoId = "lhhyE7NVcbg"; // Hardcoded video ID
        try {
            const response = await axios.get(`http://localhost:5000/transcript?videoId=${videoId}`);
            setTranscriptSummary(response.data); // Assuming the response contains the summary directly

            // Show a message in the chat indicating the summary has been fetched
            const botMessage = { sender: "bot", text: "Here's the transcript summary:" };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: response.data }]);
        } catch (error) {
            console.error("Error fetching transcript summary:", error);
            const botMessage = { sender: "bot", text: "Failed to fetch transcript summary." };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    const clearChat = () => {
        setMessages([{ sender: "bot", text: "Chat cleared! How can I help you now?" }]);
        setTranscriptSummary(""); // Clear the transcript summary as well
    };

    const readOutLoud = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <div className="fixed bottom-6 right-6">
                <button
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
                    onClick={toggleChatbot}
                >
                    {isOpen ? "Close Chat" : "Chat with Us"}
                </button>

                {isOpen && (
                    <div className="bg-white shadow-lg rounded-lg w-[32rem] h-[40rem] p-4 mt-4">
                        <h2 className="text-xl font-semibold text-blue-700 mb-4">DSA Chatbot</h2>
                        <div className="flex justify-between mb-2">
                            <span>Chat</span>
                            <button
                                onClick={clearChat}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-400 transition"
                            >
                                Clear Chat
                            </button>
                        </div>
                        <div className="flex flex-col h-[20rem] overflow-y-auto border-t border-b p-2">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 rounded-lg ${
                                        msg.sender === "bot" ? "bg-blue-100 text-blue-700" : "bg-gray-200 self-end"
                                    }`}
                                >
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    <button
                                        className="text-xs text-blue-500 mt-1"
                                        onClick={() => readOutLoud(msg.text)}
                                    >
                                        Read Aloud
                                    </button>
                                </div>
                            ))}
                            <div ref={chatEndRef} /> {/* Reference for scrolling */}
                        </div>

                        <div className="mt-4 flex">
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full mr-2"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                            >
                                Send
                            </button>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={fetchTranscriptSummary}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                            >
                                Get Transcript Summary for Current Video
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// DSA Course Component
export default function DSA_Course() {
    return (
        <div className="bg-gray-50 min-h-screen p-8 relative">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">Data Structures and Algorithms</h1>
                <p className="text-gray-600">Master the fundamentals of Data Structures and Algorithms with curated materials and resources.</p>
            </header>

            {/* Course Content */}
            <div className="grid gap-8 md:grid-cols-2">
                {/* PDF Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Interview Questions PDF</h2>
                    <iframe
                        title="course pdf"
                        src="https://edulib-files.nyc3.cdn.digitaloceanspaces.com/DSA_Course/Data%20Structure%20Interview%20Questions%20(2023)%20-%20javatpoint.pdf"
                        width="100%"
                        height="500"
                        className="rounded-lg"
                    ></iframe>
                    <p className="text-gray-500 mt-2 text-sm">
                        Download or view the PDF for a comprehensive list of interview questions on Data Structures and Algorithms.
                    </p>
                </div>

                {/* Video Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Introduction Video</h2>
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/lhhyE7NVcbg?si=T1Xa5a3elf6W5G87"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="rounded-lg"
                    ></iframe>
                    <p className="text-gray-500 mt-2 text-sm">
                        Watch this introductory video for a quick overview of essential data structures and algorithms.
                    </p>
                </div>
            </div>

            {/* Topics Section */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Topics</h2>
                <ul className="grid gap-4 md:grid-cols-3">
                    {["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs", "Sorting Algorithms", "Searching Algorithms"].map(
                        (topic, index) => (
                            <li
                                key={index}
                                className="bg-blue-100 text-blue-700 rounded-lg shadow p-4 text-center font-medium hover:bg-blue-200 transition"
                            >
                                {topic}
                            </li>
                        )
                    )}
                </ul>
            </section>

            {/* Chatbot */}
            <Chatbot />
        </div>
    );
}
