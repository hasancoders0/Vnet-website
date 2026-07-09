"use client";

import { useEffect, useState } from "react";
import { FaUpload, FaSpinner, FaImage, FaTrash, FaLink } from "react-icons/fa";
import AppImage from "@/components/ui/AppImage";

export default function ImagePicker({ value, onChange, folder = "general" }) {
  const [mode, setMode] = useState("upload");
  const [preview, setPreview] = useState(value || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleUrlChange = (url) => {
    setPreview(url);
    onChange(url);
  };

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      setPreview("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
    setMode("upload");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* IMAGE EXISTS */}
      {preview || loading ? (
        <>
          <div className="relative aspect-[4/3] bg-gray-50">
            {preview ? (
              <AppImage
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <FaSpinner className="text-4xl text-purple-500 animate-spin" />
                  <span className="text-sm text-gray-500">
                    Uploading image...
                  </span>
                </div>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3 text-white">
                  <FaSpinner className="text-2xl animate-spin" />
                  <span className="text-sm font-medium">
                    Uploading image...
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3">
            <button
              type="button"
              disabled={loading}
              onClick={removeImage}
              className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-50
              px-4
              py-2
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            >
              <FaTrash className="text-xs" />
              Remove Image
            </button>
          </div>
        </>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex gap-2 border-b border-gray-100 p-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => setMode("upload")}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                mode === "upload"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Upload
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => setMode("url")}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                mode === "url"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              URL
            </button>
          </div>

          <div className="p-4">
            {mode === "url" ? (
              <div className="space-y-3">
                <div className="relative">
                  <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.webp"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-4
                      text-sm
                      outline-none
                      focus:border-purple-500
                    "
                  />
                </div>
              </div>
            ) : (
              <label
                className="
                  flex
                  min-h-[180px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-dashed
                  border-gray-300
                  bg-gray-50
                  transition
                  hover:border-purple-400
                  hover:bg-purple-50
                "
              >
                <FaImage className="text-4xl text-gray-300" />

                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Choose Image
                  </p>

                  <p className="text-xs text-gray-400">JPG, PNG, WEBP</p>
                </div>

                <input
                  hidden
                  disabled={loading}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e.target.files?.[0])}
                />
              </label>
            )}
          </div>
        </>
      )}
    </div>
  );
}
