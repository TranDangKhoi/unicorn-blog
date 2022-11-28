import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input, InputPassword } from "components/Input";
import { Label } from "components/Label";
import { Layout } from "components/Layout";
import { Validate } from "components/Validate";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpSchema } from "schema/schema";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
import AuthenticationPage from "./AuthenticationPage";
import Homepage from "./Homepage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(signUpSchema),
  });
  useEffect(() => {
    document.body.scrollIntoView({ block: "start" });
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

  const handleSignUp = async (values) => {
    try {
      if (!isValid) return;
      toast.info("Signing up, please wait...", {
        hideProgressBar: true,
      });
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: values.username,
      });
      await updateProfile(auth.currentUser, {
        photoURL: `https://ui-avatars.com/api/?background=random&name=${values.username}`,
      });
      await setUserInfo(user);

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username: values.username,
        avatar: auth.currentUser.photoURL,
        email: values.email,
        password: values.password,
        createdAt: serverTimestamp(),
        status: userStatus.ACTIVE,
        role: userRole.USER,
        usernameSlug: slugify(values.username, { lower: true }),
        userId: auth.currentUser.uid,
      });

      toast.dismiss();
      toast.success("Created account successfully!", {
        hideProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        "This e-mail address has already been used, please pick another one!"
      );
    }
  };
  if (userInfo) return <Homepage></Homepage>;

  return (
    <Layout>
      <AuthenticationPage>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
            <Validate>Your username must have less than 24 characters</Validate>
          </Field>
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
            <Validate>
              Your email address must be in the correct pattern (e.g:
              foobar@gmail.com)
            </Validate>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPassword control={control}></InputPassword>
            <Validate>Your password must have more than 8 characters</Validate>
          </Field>
          <Field>
            <Label htmlFor="confirmPassword">Re-confirm password</Label>
            <InputPassword
              name="confirmPassword"
              control={control}
            ></InputPassword>
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign up
          </Button>
          <div className="redirect">
            Already had an account?{" "}
            <Link className="redirect-link" to="/sign-in">
              Sign in here
            </Link>
          </div>
        </form>
      </AuthenticationPage>
    </Layout>
  );
};

export default SignUpPage;
