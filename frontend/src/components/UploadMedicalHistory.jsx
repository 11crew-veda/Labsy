import React, { useState } from "react";
import axios from "axios";

export default function UploadMedicalHistory() {
  const [medicalHistory, setMedicalHistory] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [hash, setHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [hashLoading, setHashLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!medicalHistory && !file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("medicalHistory", medicalHistory);
    if (file) formData.append("file", file);
    try {
      await axios.post("http://localhost:4000/api/medical/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
      setMedicalHistory("");
      setFile(null);
    } catch (err) {
      alert("Upload failed!");
    }
    setUploading(false);
  };

  const handleGetHash = async () => {
    setHashLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/medical/upload/hash");
      setHash(res.data.hash);
    } catch (err) {
      alert("Failed to fetch hash!");
    }
    setHashLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Past Medical History</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        placeholder="Write past medical history..."
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
      />
      <div
        className={`border-2 border-dashed rounded p-4 mb-4 text-center transition ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".png,.pdf"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {file ? (
            <span className="font-medium">Selected: {file.name}</span>
          ) : (
            <span>
              Drag & drop PNG/PDF here, or{" "}
              <span className="text-blue-600 underline">browse</span>
            </span>
          )}
        </label>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4 w-full"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <div className="flex items-center gap-2 mb-2">
        <button
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
          onClick={handleGetHash}
          disabled={hashLoading}
        >
          {hashLoading ? "Fetching..." : "Get Hash"}
        </button>
        {hash && (
          <div className="flex items-center gap-1">
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {hash}
            </span>
            <button
              className="ml-1 text-blue-600 hover:text-blue-800"
              onClick={handleCopy}
              title="Copy hash"
            >
              {copied ? (
                "✓"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <rect
                    width="14"
                    height="14"
                    x="5"
                    y="5"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 3h10a2 2 0 0 1 2 2v10"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
