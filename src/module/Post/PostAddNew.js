import { yupResolver } from "@hookform/resolvers/yup";
import { imgbbAPI } from "api-config";
import axios from "axios";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Field, FieldCheckbox } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { Toggle } from "components/Toggle";
import { ImageUpload } from "components/Upload";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/Category/DashboardHeading";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { postAddNewSchema } from "schema/schema";
import slugify from "slugify";
import Swal from "sweetalert2";
import { postStatus } from "utils/constants";

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const [content, setContent] = useState("");
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
      category: {},
      user: {},
      popular: false,
    },
    resolver: yupResolver(postAddNewSchema),
  });
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docData = await getDoc(docRef);
      setValue("user", {
        id: docData.id,
        ...docData.data(),
      });
    }
    fetchUserData();
  }, [setValue, userInfo.uid]);
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
    console.log(values);
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
          slug: slugify(values.title, { lower: true }),
          content,
          imageURL,
          categoryId: cloneValues.category.id,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
        toast.success("Your blog has been posted successfully");
        Swal.fire({
          title: "Success!",
          text: "You can view your blog in the dashboard now",
        });
        reset({
          title: "",
          slug: slugify(values.title, { lower: true }),
          status: 2,
          category: {},
          content: "",
          imageURL: "",
          popular: false,
          user: {},
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
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.dismiss(arrErrors.find((item) => item === 0));
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  }, [errors]);
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
        [{ header: [1, 2, 3, 4, false] }],
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
  return (
    <>
      <DashboardHeading
        title="Add new post"
        desc="Share your stories with us ^o^"
      ></DashboardHeading>
      <form
        className="mt-10 form-layout"
        onSubmit={handleSubmit(handleAddPost)}
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
        <div className="w-full mb-10">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
          />
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
          Publish
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
