import { Field } from "components/Field";
import { Input, InputPassword } from "components/Input";
import { Button } from "components/Button";
import { Label } from "components/Label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";
import Homepage from "./Homepage";

const schema = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .max(30, "Your username should be less than 30 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Your email address is invalid, please enter another one"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

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
  // useEffect(() => {
  //   document.title = "Sign up to Unicorn Blog";
  //   if (userInfo?.email) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInfo]);
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
      setUserInfo(user);
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
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="text"
            name="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
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
  );
};

export default SignUpPage;
