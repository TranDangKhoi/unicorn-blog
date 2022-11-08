import React from "react";

const ImageUpload = ({
  name,
  className,
  progress = 0,
  image = "",
  ...props
}) => {
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg relative overflow-hidden ${className}`}
    >
      <input
        type="file"
        name={name}
        id={name}
        className="hidden-input"
        onChange={() => {}}
        {...props}
      />
      {!image && (
        <>
          <div className="flex flex-col items-center text-center pointer-events-none">
            <img
              srcSet="/img-upload.png"
              alt="Upload your"
              className="max-w-[80px] mb-5"
            />
            <p className="font-semibold">Choose image</p>
          </div>
          <div
            className="absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-500 image-upload-progress"
            style={{
              width: `${Math.floor(progress)}%`,
            }}
          ></div>
        </>
      )}
      {image && (
        <img src={image} className="object-cover w-full h-full" alt="" />
      )}
    </label>
  );
};

export default ImageUpload;
