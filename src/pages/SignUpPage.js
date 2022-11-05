import { Field } from "components/Field";
import { IconEyeClosed, IconEyeOpen } from "components/Icon";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { Label } from "components/Label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { toast } from "react-toastify";
const SignUpPageStyles = styled.div`
  background: #f2f2f2;
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    background: white;
    border-radius: 12px;
    padding: 40px;
    max-width: 700px;
    margin: 0 auto;
  }

  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 500;
    font-size: 16px;
  }
`;

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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [hidePassword, setHidePassword] = useState(true);
  useEffect(() => {
    document.title = "Sign up to Unicorn Blog";
  }, []);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  }, [errors]);
  const handleSignUp = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(errors);
      }, 3000);
    });
  };
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/blog-logo.png 1.5x" alt="unicorn-blog" className="logo" />
        <h1 className="heading">Unicorn Blog</h1>
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
            <Input
              type={hidePassword ? "password" : "text"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {hidePassword ? (
                <IconEyeClosed
                  onClick={() => setHidePassword(false)}
                ></IconEyeClosed>
              ) : (
                <IconEyeOpen
                  onClick={() => setHidePassword(true)}
                ></IconEyeOpen>
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
