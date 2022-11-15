import { Button } from "components/Button";
import { Field, FieldCheckbox } from "components/Field";
import { Input, InputPassword } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { ImageUpload } from "components/Upload";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/Category/DashboardHeading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    reset,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      avatar: "",
      email: "",
      password: "",
      createdAt: new Date(),
      status: userStatus.ACTIVE,
      role: userRole.USER,
    },
  });
  const watchUserStatus = Number(watch("status"));
  const watchUserRole = Number(watch("role"));
  const {
    imageURL,
    progress,
    handleResetUploadAfterSubmit,
    handleRemoveImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const handleCreateNewUser = async (values) => {
    Swal.fire({
      title: "Are you sure you want to create this user?",
      html: `
      <div>Username: ${values.username}</div>
      <div>E-mail address: ${values.email}</div>
      <div>Password: ${values.password}</div>
      <div>Status: ${values.status}</div>
      <div>Role: ${values.role}</div>
      `,
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#1DC071",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await updateProfile(auth.currentUser, {
            displayName: values.username,
            photoURL: `https://ui-avatars.com/api/?background=random&name=${values.username}`,
          });
          await addDoc(collection(db, "users"), {
            username: values.username,
            avatar: `https://ui-avatars.com/api/?background=random&name=${values.username}`,
            email: values.email,
            password: values.password,
            createdAt: serverTimestamp(),
            status: Number(values.status),
            role: Number(values.role),
            userId: user.user.uid,
            usernameSlug: slugify(values.username, { lower: true }),
          });
          reset({
            username: "",
            avatar: "",
            email: "",
            password: "",
            createdAt: new Date(),
            status: userStatus.ACTIVE,
            role: userRole.USER,
          });
          Swal.fire({
            icon: "success",
            iconColor: "#1DC071",
            title: "Created user successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          toast.error("Failed to create new user", {
            autoClose: 1500,
          });
          console.log(err);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "success",
          iconColor: "#1DC071",
          title: "Cancelled creating user successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
    handleResetUploadAfterSubmit();
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateNewUser)}>
        <div className="w-[250px] h-[250px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="h-full rounded-full"
            onChange={handleSelectImage}
            handleRemoveImage={handleRemoveImage}
            scrollable={false}
            centeredCloseIcon={true}
            imageURL={imageURL}
            progress={progress}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email address"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPassword
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></InputPassword>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckbox>
              <Radio
                name="status"
                control={control}
                checked={watchUserStatus === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchUserStatus === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchUserStatus === userStatus.BANNED}
                value={userStatus.BANNED}
              >
                Banned
              </Radio>
            </FieldCheckbox>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckbox>
              <Radio
                name="role"
                control={control}
                checked={watchUserRole === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchUserRole === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchUserRole === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckbox>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto w-[200px]"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
