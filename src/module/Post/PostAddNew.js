import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Field, FieldCheckbox } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { postStatus } from "utils/constants";
import { ImageUpload } from "components/Upload";
import useFirebaseImage from "hooks/useFirebaseImage";
import { Toggle } from "components/Toggle";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useState } from "react";
import { useAuth } from "contexts/auth-context";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DashboardHeading from "module/Category/DashboardHeading";
import Swal from "sweetalert2";
const schema = yup.object({
  title: yup
    .string()
    .required("Please enter your post's title")
    .min(8, "Your title must be longer than 8 characters"),
  slug: yup.string(),
  status: yup.number().oneOf([1, 2, 3]),
  categoryId: yup.string().required("Please select an category"),
  popular: yup.bool().required("Is this post a popular one?"),
});
const PostAddNew = () => {
  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      popular: false,
    },
    resolver: yupResolver(schema),
  });
  const { userInfo } = useAuth();
  const {
    imageURL,
    progress,
    handleResetUploadAfterSubmit,
    handleRemoveImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  // Convert status sang number vì database trả dưới dạng number
  const watchPopular = watch("popular");
  const watchStatus = Number(watch("status"));
  const handleAddPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, {
      lower: true,
    });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    await Swal.fire({
      title: "Are you sure you want to post this into your blog?",
      text: "Feel free to re-check your contents!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      cancelButtonText: "Wait, don't post this yet",
      confirmButtonText: "Confirm, i want to post this",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await addDoc(colRef, {
          ...cloneValues,
          imageURL,
          userId: userInfo.uid,
          createdAt: serverTimestamp(),
        });
        toast.success("Your blog has been posted successfully");
        Swal.fire({
          title: "Success!",
          text: "You can view your blog in the dashboard now",
        });
        reset({
          title: "",
          slug: "",
          status: 2,
          categoryId: "",
          imageURL: "",
          popular: false,
        });
        handleResetUploadAfterSubmit();
        setSelectCategory({});
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "success",
          iconColor: "#1DC071",
          title: "You're safe!",
          text: "Cancelled",
        });
      }
    });
  };

  const handleSelectOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item);
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
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.dismiss(arrErrors.find((item) => item === 0));
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  }, [errors]);
  return (
    <>
      <DashboardHeading
        title="Add new post"
        desc="Share your stories with us ^o^"
      ></DashboardHeading>
      <form className="form-layout" onSubmit={handleSubmit(handleAddPost)}>
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
        <div className="w-full h-full mb-10">
          <Field>
            <Label required={true} htmlFor="image">
              Image
            </Label>
            <ImageUpload
              imageURL={imageURL}
              progress={progress}
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
          Publish
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
