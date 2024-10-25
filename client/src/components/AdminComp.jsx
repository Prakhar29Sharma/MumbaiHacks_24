import React, { useState, useEffect } from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill CSS

const AdminComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [quill, setQuill] = useState(null); // State to hold Quill instance

  const showPopup = () => {
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
  };

  const closeEntryPopup = () => {
    setIsEntryModalOpen(false);
  };

  const submitForm = (event) => {
    event.preventDefault();

    const textInput = quill.root.innerHTML; // Get HTML from Quill editor
    const subHeadingInput = event.target.subHeadingInput.value;
    const pdfInput = event.target.pdfInput.files[0];
    const youtubeInput = event.target.youtubeInput.value;

    const entry = {
      id: entries.length + 1,
      text: textInput,
      subHeading: subHeadingInput,
      pdf: pdfInput ? pdfInput.name : 'No file uploaded',
      youtube: youtubeInput,
    };

    setEntries([...entries, entry]);
    setIsModalOpen(false);
    event.target.reset();
  };

  const showEntryDetails = (entry) => {
    setSelectedEntry(entry);
    setIsEntryModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      // Initialize Quill editor when modal opens
      const quillInstance = new Quill('#editor', {
        theme: 'snow',
      });
      setQuill(quillInstance);
    }
  }, [isModalOpen]); // Runs when modal opens

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Main Form */}
      <form className="space-y-6 max-w-lg w-full mt-16 text-center">
        <div className="flex items-center justify-center">
          <label className="text-right text-gray-600 w-1/3 mr-4">Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            required
            className="flex-grow p-2 border-b-2 focus:border-gray-800 outline-none"
          />
        </div>

        <div className="flex items-center justify-center">
          <label className="text-right text-gray-600 w-1/3 mr-4">Password</label>
          <input
            type="text"
            placeholder="Enter the description"
            required
            className="flex-grow p-2 border-b-2 focus:border-gray-800 outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={showPopup}
            className="bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition w-full max-w-xs"
          >
            Add Pages
          </button>
        </div>
      </form>

      {/* Display Entry List */}
      <div id="entryList" className="mt-8 text-center">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
            onClick={() => showEntryDetails(entry)}
          >
            Page {entry.id}
          </div>
        ))}
      </div>

      {/* Modal for Adding Entry */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-[70%] w-full">
            <span
              className="text-gray-500 text-2xl float-right cursor-pointer"
              onClick={closePopup}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">Add Entry</h2>
            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="block text-gray-600">Subheading</label>
                <input
                  name="subHeadingInput"
                  type="text"
                  required
                  className="w-full p-2 border-b-2 focus:border-gray-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600">Text</label>
                <input
                  name="textInput"
                  type="text"
                  required
                  className="w-full p-2 border-b-2 focus:border-gray-800 outline-none"
                />
                <section>
                  <div id="editor" style={{ height: '200px' }}></div> {/* Define height */}
                </section>
              </div>
              <div>
                <label className="block text-gray-600">Upload PDF</label>
                <input
                  name="pdfInput"
                  type="file"
                  accept=".pdf"
                  className="w-full p-2 border-b-2 focus:border-gray-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600">YouTube URL</label>
                <input
                  name="youtubeInput"
                  type="url"
                  placeholder="Enter YouTube URL"
                  required
                  className="w-full p-2 border-b-2 focus:border-gray-800 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing Entry Details */}
      {isEntryModalOpen && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
            <span
              className="text-gray-500 text-2xl float-right cursor-pointer"
              onClick={closeEntryPopup}
            >
              &times;
            </span>
            <h2 className="text-lg font-bold mb-4">Entry Details</h2>
            <div className="space-y-4">
              <div>
                <strong>Text:</strong> {selectedEntry.text}
              </div>
              <div>
                <strong>Subheading:</strong> {selectedEntry.subHeading}
              </div>
              <div>
                <strong>PDF:</strong> {selectedEntry.pdf}
              </div>
              <div>
                <strong>YouTube URL:</strong>{" "}
                <a
                  href={selectedEntry.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {selectedEntry.youtube}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComp;
