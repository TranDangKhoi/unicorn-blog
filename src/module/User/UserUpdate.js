import { ImageUpload } from "components/Upload";
import DashboardHeading from "module/Category/DashboardHeading";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  });
  const userId = searchParams.get("userId");
  const handleUpdateUser = () => {};
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user's information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="mb-10 text-center">
          <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            handleRemoveImage={handleRemoveImage}
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
            <FieldCheckboxes>
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
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
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
            </FieldCheckboxes>
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

export default UserUpdate;
