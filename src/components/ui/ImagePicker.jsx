"use client";

import { useState } from "react";
import { FaUpload, FaSpinner } from "react-icons/fa";

export default function ImagePicker({
  value,
  onChange,
  label = "Image",
  folder = "general",
}) {
  const [mode, setMode] = useState("url");
  const [preview, setPreview] = useState(value || "");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE URL =================
  const handleUrlChange = (val) => {
    setPreview(val);
    onChange(val);
  };

  // ================= HANDLE UPLOAD =================
  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">

      {/* LABEL */}
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      {/* TOGGLE */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-4 py-1.5 rounded-lg text-sm transition ${
            mode === "url"
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          URL
        </button>

        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-4 py-1.5 rounded-lg text-sm transition ${
            mode === "upload"
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Upload
        </button>
      </div>

      {/* INPUT */}
      {mode === "url" ? (
        <input
          placeholder="Enter image URL..."
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        />
      ) : (
        <label className="relative flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">

          {loading ? (
            <>
              <FaSpinner className="animate-spin text-gray-500" />
              <p className="text-sm text-gray-500">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <FaUpload className="text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag image
              </p>
            </>
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              handleUpload(e.target.files[0])
            }
          />
        </label>
      )}

      {/* PREVIEW */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg border"
          />

          <button
            type="button"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}