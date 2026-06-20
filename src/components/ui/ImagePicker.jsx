"use client";

import { useEffect, useState } from "react";
import {
FaUpload,
FaSpinner,
FaImage,
FaTrash,
FaSyncAlt,
} from "react-icons/fa";

export default function ImagePicker({
value,
onChange,
label = "Image",
folder = "general",
}) {
const [mode, setMode] = useState("url");
const [preview, setPreview] = useState(value || "");
const [loading, setLoading] = useState(false);

useEffect(() => {
setPreview(value || "");
}, [value]);

// ================= URL =================
const handleUrlChange = (val) => {
setPreview(val);
onChange(val);
};

// ================= UPLOAD =================
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

const removeImage = () => {
setPreview("");
onChange("");
};

return ( <div className="space-y-4">
{/* LABEL */} <label className="text-sm font-medium text-gray-700">
{label} </label>

 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* LEFT SIDE */}
    <div className="space-y-4">
      {/* TOGGLE */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg text-sm transition ${
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
          className={`px-4 py-2 rounded-lg text-sm transition ${
            mode === "upload"
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Upload
        </button>
      </div>

      {/* URL MODE */}
      {mode === "url" ? (
        <div className="space-y-2">
          <input
            placeholder="Enter image URL..."
            value={
              typeof value === "string"
                ? value
                : ""
            }
            onChange={(e) =>
              handleUrlChange(
                e.target.value
              )
            }
            className="
              w-full h-11 px-4
              rounded-xl
              border border-gray-200
              text-sm
              focus:ring-2
              focus:ring-purple-500
              outline-none
            "
          />

          <p className="text-xs text-gray-400">
            Paste any valid image URL
          </p>
        </div>
      ) : (
        <label
          className="
            flex flex-col
            items-center
            justify-center
            gap-3
            border border-dashed
            border-gray-300
            rounded-xl
            p-10
            text-center
            cursor-pointer
            hover:bg-gray-50
            hover:border-purple-300
            transition
          "
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-purple-600 text-xl" />

              <p className="text-sm text-gray-500">
                Uploading image...
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                {preview ? (
                  <FaSyncAlt className="text-purple-600 text-lg" />
                ) : (
                  <FaUpload className="text-purple-600 text-lg" />
                )}
              </div>

              <div>
                <p className="text-base font-semibold text-gray-800">
                  {preview
                    ? "Change Image"
                    : "Upload Image"}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {preview
                    ? "Replace current image"
                    : "JPG, PNG, WEBP"}
                </p>
              </div>
            </>
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              handleUpload(
                e.target.files?.[0]
              )
            }
          />
        </label>
      )}
    </div>

    {/* RIGHT SIDE */}
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {preview ? (
        <>
          <img
            src={preview}
            alt="preview"
            className="
              w-full
              aspect-[4/3]
              object-cover
            "
          />

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  Current Image
                </p>

                <p className="text-xs text-gray-400 truncate">
                  {preview}
                </p>
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="
                  flex items-center gap-2
                  px-3 py-2
                  rounded-lg
                  bg-red-50
                  text-red-600
                  text-sm
                  hover:bg-red-100
                  transition
                "
              >
                <FaTrash className="text-xs" />
                Remove
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="aspect-[4/3] flex flex-col items-center justify-center text-center p-6">
          <FaImage className="text-5xl text-gray-300 mb-4" />

          <p className="text-sm font-medium text-gray-600">
            No Image Selected
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Preview will appear here
          </p>
        </div>
      )}
    </div>
  </div>
</div>
 

);
}
