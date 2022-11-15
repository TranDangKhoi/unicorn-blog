import { Button } from "components/Button";
import { Field, FieldCheckbox } from "components/Field";
import { Input, InputPassword } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/Category/DashboardHeading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      status: userStatus.ACTIVE,
    },
  });
  const userId = searchParams.get("userId");
  const watchUserStatus = Number(watch("status"));
  const watchUserRole = Number(watch("role"));
  useEffect(() => {
    async function getCurrentUserValue() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      await getDoc(docRef).then((doc) => {
        reset(doc.data());
      });
    }
    getCurrentUserValue();
  }, [userId, reset]);
  const handleUpdateUser = async (values) => {
    const cloneValues = { ...values };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      ...cloneValues,
      usernameSlug: slugify(cloneValues.username, { lower: true }),
      status: Number(cloneValues.status),
      role: Number(cloneValues.role),
    });
    toast.success("Update user successfully", {
      closeOnClick: true,
    });
    navigate("/manage/user");
  };
  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user's information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="mb-10 text-center">
          {/* <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            handleRemoveImage={handleRemoveImage}
            imageURL={imageURL}
            progress={progress}
          ></ImageUpload> */}
        </div>
        <div className="form-layout-2">
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email address"
              control={control}
              type="email"
            ></Input>
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
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
