import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Heading } from "components/Layout";
import { Radio } from "components/Radio";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { postStatus } from "utils/constants";
import { toast } from "react-toastify";
import { ImageUpload } from "components/Upload";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
const PostAddNewStyles = styled.div``;
const PostAdd = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
    },
  });
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");
  // Convert status sang number vì database trả dưới dạng number
  const watchStatus = Number(watch("status"));
  const watchCategory = watch("category");
  const handleAddPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(
      cloneValues.slug.toLowerCase() || cloneValues.title.toLowerCase()
    );
    cloneValues.status = Number(values.status);
    console.log(cloneValues);
    // handleUploadImage(cloneValues.image);
    // const colRef = collection(db, "posts");
    // await addDoc(colRef, {

    // })
  };
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
    setValue("image", file);
    handleUploadImage(file);
  };

  return (
    <PostAddNewStyles>
      <Heading>Write new post</Heading>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              image={imageURL}
              progress={progress}
              onChange={handleSelectImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-col gap-y-[52px]">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.APPROVED}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.PENDING}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.REJECTED}
                value={3}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              control={control}
              name="author"
              placeholder="Who's the author"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10"></div>
        <Button type="submit" className="mx-auto">
          Publish
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAdd;
