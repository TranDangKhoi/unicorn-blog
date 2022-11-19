import { LoadingSpinner } from "components/Loading";
import PropTypes from "prop-types";

const ImageUpload = ({
  name,
  className,
  minHeight,
  centeredCloseIcon = false,
  scrollable = true,
  progress = 0,
  imageURL = "",
  handleRemoveImage = () => {},
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={`cursor-pointer w-full flex items-center justify-center bg-gray-100 border border-dashed group ${
        scrollable ? "overflow-auto" : "overflow-hidden"
      } ${minHeight ? `min-h-[600px]` : ""} rounded-lg relative ${className}`}
    >
      <input
        type="file"
        name={name}
        id={name}
        className="hidden-input"
        onChange={() => {}}
        accept="image/png, image/gif, image/jpeg"
        {...props}
      />
      {progress !== 0 && !imageURL && (
        <LoadingSpinner
          borderColor="#1DC071"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        ></LoadingSpinner>
      )}
      {!imageURL && (
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
      {imageURL && (
        <>
          <img src={imageURL} className="object-cover w-full h-full" alt="" />
          <button
            type="button"
            className={`${
              !centeredCloseIcon
                ? "absolute z-10 flex items-center text-[22px] justify-center p-5 opacity-0 invisible bg-white rounded-full w-6 h-6 top-6 right-4 group-hover:opacity-100 group-hover:visible"
                : "absolute z-10 flex items-center text-[22px] justify-center p-5 opacity-0 invisible bg-white rounded-full w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:visible"
            }`}
            onClick={handleRemoveImage}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </>
      )}
    </label>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  imageURL: PropTypes.string,
  handleRemoveImage: PropTypes.func,
};

export default ImageUpload;
