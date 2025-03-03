import { useRef, useState } from "react";

export default function ImagePicker({ onImageSelect }) {
  const [preview, setPreview] = useState();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelect(file);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="fill object-cover rounded-md border mt-2"
        />
      )}
    </div>
  );
}
