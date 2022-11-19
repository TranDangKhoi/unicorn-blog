import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";

import { useSearchParams } from "react-router-dom";

import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Field, FieldCheckbox } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { Toggle } from "components/Toggle";
import { ImageUpload } from "components/Upload";
import { db } from "firebase-app/firebase-config";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/Category/DashboardHeading";
import { postStatus } from "utils/constants";

import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { imgbbAPI, imgBBEndpoint } from "api-config";
import axios from "axios";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
  });
  const watchStatus = Number(watch("status"));
  const watchPopular = watch("popular");
  const thumbnailImageURL = getValues("imageURL");
  const thumbnailImageName = getValues("image_name");
  const {
    handleRemoveImage,
    setImageURL,
    imageURL,
    handleSelectImage,
    progress,
  } = useFirebaseImage(
    setValue,
    getValues,
    thumbnailImageName,
    deleteThumbnail
  );

  useEffect(() => {
    async function getPost() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    getPost();
  }, [postId, reset]);
  useEffect(() => {
    async function getCategories() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const docs = await getDocs(q);
      let yourCategories = [];
      docs.forEach((doc) => {
        yourCategories.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(yourCategories);
    }
    getCategories();
  }, []);
  useEffect(() => {
    setImageURL(thumbnailImageURL);
  }, [thumbnailImageURL, setImageURL]);

  async function deleteThumbnail() {}
  const handleUpdatePost = async (values) => {
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        content,
      });
      toast.success("Post updated successfully", {
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  async function deleteAvatar() {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      imageURL: "",
    });
  }
  const handleSelectOption = async (item) => {
    const docRef = doc(db, "categories", item.id);
    const docData = await getDoc(docRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    // setValue("categoryId", item.id);
    setSelectCategory(item);
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["clean"],
        [("link", "image")],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  if (!postId) return null;
  return (
    <>
      <DashboardHeading
        title="Update your post"
        desc="Update post's contents"
      ></DashboardHeading>
      <form
        className="mt-10 form-layout"
        onSubmit={handleSubmit(handleUpdatePost)}
      >
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label required={true} htmlFor="title">
              Title
            </Label>
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
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              control={control}
              name="author"
              placeholder="Who's the author"
            ></Input>
          </Field>
          <Field>
            <Label required={true} htmlFor="category">
              Category
            </Label>
            <Dropdown>
              <Dropdown.Select></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      onClick={() => handleSelectOption(item)}
                      key={item.id}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-4 text-sm font-semibold text-white rounded-lg bg-primary">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10 entry-content">
          <Field>
            <Label required={true}>Edit your post's content:</Label>
            <div className="w-full">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="w-full h-full mb-10">
          <Field>
            <Label required={true} htmlFor="image">
              Your thumbnail
            </Label>
            <ImageUpload
              imageURL={imageURL}
              progress={progress}
              minHeight="600px"
              onChange={handleSelectImage}
              handleRemoveImage={handleRemoveImage}
            ></ImageUpload>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label required={true} htmlFor="status">
              Status
            </Label>
            <FieldCheckbox>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckbox>
          </Field>

          <Field>
            <Label htmlFor="popular">Popular post</Label>
            <Toggle
              name="popular"
              on={watchPopular === true}
              onClick={() => setValue("popular", !watchPopular)}
            ></Toggle>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update your post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
