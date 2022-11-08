import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const handleUploadImage = (file) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            toast.info("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            toast.error("You must login to use this feature", {
              hideProgressBar: true,
            });
            break;
          case "storage/canceled":
            // User canceled the upload
            toast.info("You have just cancelled the upload progress!");
            break;

          case "storage/unknown":
            toast.error("Unknown error occurred, inspect error.serverResponse");
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    console.log(progress);

    handleUploadImage(file);
  };
  const handleRemoveImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        console.log("Uploaded image removed successfully!");
        setImageURL("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Failed to remove image");
      });
  };
  return {
    imageURL,
    handleRemoveImage,
    progress,
    handleSelectImage,
    handleUploadImage,
  };
}
