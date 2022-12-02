import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { ImageUpload } from "components/Upload";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/Category/DashboardHeading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";

const UserProfile = () => {
  const { userInfo } = useAuth();
  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });
  const avatarURL = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(avatarURL);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const {
    handleRemoveImage,
    setImageURL,
    imageURL,
    handleSelectImage,
    progress,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  async function deleteAvatar() {
    const docRef = doc(db, "users", userInfo.uid);
    const docData = await getDoc(docRef);
    const userData = docData.data();
    await updateDoc(docRef, {
      avatar: `https://ui-avatars.com/api/?background=random&name=${userData.username}`,
    });
  }
  useEffect(() => {
    setImageURL(avatarURL);
  }, [avatarURL, setImageURL]);
  useEffect(() => {
    async function getCurrentUserValue() {
      if (!userInfo.uid) return;
      const docRef = doc(db, "users", userInfo.uid);
      await getDoc(docRef).then((doc) => {
        reset(doc.data());
      });
    }
    getCurrentUserValue();
  }, [reset, userInfo]);
  const handleUpdateUserProfile = async (values) => {
    const cloneValues = { ...values };
    const docRef = doc(db, "users", userInfo.uid);
    try {
      await updateDoc(docRef, {
        ...cloneValues,
        avatar: imageURL,
        usernameSlug: slugify(cloneValues.username, { lower: true }),
        status: Number(cloneValues.status),
        role: Number(cloneValues.role),
      });
      toast.success("Update user successfully", {
        closeOnClick: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (!userInfo.uid) return null;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
        <div className="w-[250px] h-[250px] mx-auto rounded-full mb-10">
          <ImageUpload
            name="image"
            className="h-full rounded-full"
            onChange={handleSelectImage}
            handleRemoveImage={handleRemoveImage}
            scrollable={false}
            centeredCloseIcon={true}
            imageURL={imageURL}
            progress={progress}
          ></ImageUpload>
        </div>
        <div className="form-layout-2">
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your e-mail address"
            ></Input>
          </Field>
        </div>
        <div className="form-layout-2">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
