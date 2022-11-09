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

import { postStatus } from "utils/constants";
import { ImageUpload } from "components/Upload";
import useFirebaseImage from "hooks/useFirebaseImage";
import { Toggle } from "components/Toggle";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useState } from "react";
const PostAddNewStyles = styled.div``;
const PostAdd = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      popular: false,
    },
  });
  const { imageURL, progress, handleRemoveImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  // Convert status sang number vì database trả dưới dạng number
  const watchPopular = watch("popular");
  const watchStatus = Number(watch("status"));
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
  useEffect(() => {
    async function getData() {
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
    getData();
  }, []);

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
        <div className="w-full h-full mb-10">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              image={imageURL}
              progress={progress}
              onChange={handleSelectImage}
              handleRemoveImage={handleRemoveImage}
            ></ImageUpload>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex items-center justify-between gap-x-5">
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
              <Dropdown.Select></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      onClick={() => setValue("categoryId", item.id)}
                      key={item.id}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
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
        <Button type="submit" className="mx-auto">
          Publish
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAdd;
