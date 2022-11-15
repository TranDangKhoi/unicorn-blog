import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input, InputPassword } from "components/Input";
import { Label } from "components/Label";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "schema/schema";
import AuthenticationPage from "./AuthenticationPage";
import Homepage from "./Homepage";

const LoginPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const handleLogin = async (values) => {
    if (!isValid) return;
    try {
      toast.info("Logging in, please wait...", {
        hideProgressBar: true,
      });
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.dismiss();
      toast.success("Logged in successfully", {
        hideProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      toast.error(
        "Your e-mail address or password is invalid, please re-enter!",
        {
          hideProgressBar: true,
        }
      );
    }
  };
  // useEffect(() => {
  //   document.title = "Login to Unicorn Blog";
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInfo]);
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
  if (userInfo) return <Homepage></Homepage>;
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email"></Label>
          <Input
            control={control}
            type="text"
            name="email"
            placeholder="Enter your email address"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password"></Label>
          <InputPassword control={control}></InputPassword>
        </Field>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign In
        </Button>
        <div className="redirect">
          Don't have an account?{" "}
          <Link className="redirect-link" to="/sign-up">
            Sign up here
          </Link>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default LoginPage;
