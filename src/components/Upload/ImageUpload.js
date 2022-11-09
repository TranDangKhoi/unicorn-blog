import { LoadingSpinner } from "components/Loading";
import React from "react";

const ImageUpload = ({
  name,
  className,
  progress = 0,
  image = "",
  handleRemoveImage = () => {},
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed overflow-auto w-full min-h-[600px] rounded-lg relative ${className}`}
    >
      <input
        type="file"
        name={name}
        id={name}
        className="hidden-input"
        onChange={() => {}}
        {...props}
      />
      {progress !== 0 && !image && (
        <LoadingSpinner
          borderColor="#1DC071"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        ></LoadingSpinner>
      )}
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
            className="absolute bottom-0 left-0 z-10 w-0 h-1 transition-all bg-green-500 image-upload-progress"
            style={{
              width: `${Math.floor(progress)}%`,
            }}
          ></div>
        </>
      )}
      {image && (
        <div className="overflow-auto">
          <img src={image} className="object-cover w-full h-full" alt="" />
          <button
            type="button"
            className="absolute z-10 flex items-center text-[22px] justify-center p-5 bg-white bg-opacity-80 rounded-full w-6 h-6 top-6 right-4 hover:bg-opacity-100"
            onClick={handleRemoveImage}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </label>
  );
};

export default ImageUpload;
