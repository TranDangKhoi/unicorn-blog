import { Field } from "components/Field";
import { IconEyeClosed } from "components/Icon";
import { Input } from "components/Input";
import { Label } from "components/Label";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
const SignUpPageStyles = styled.div`
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
    max-width: 700px;
    margin: 0 auto;
  }

  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 500;
    font-size: 16px;
  }
`;
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  useEffect(() => {
    document.title = "Sign up to Unicorn Blog";
  }, []);
  const handleSignUp = (values) => {
    console.log(values);
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
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              <IconEyeClosed className="input-icon"></IconEyeClosed>
            </Input>
          </Field>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
