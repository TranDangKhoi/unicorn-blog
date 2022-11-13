import { IconEyeClosed, IconEyeOpen } from "components/Icon";
import React from "react";
import { useState } from "react";
import Input from "./Input";

const InputPassword = ({ name = "password", control }) => {
  const [hidePassword, setHidePassword] = useState(true);
  if (!control) return null;
  return (
    <>
      <Input
        type={hidePassword ? "password" : "text"}
        name={name}
        placeholder="Enter your password"
        control={control}
      >
        {hidePassword ? (
          <IconEyeClosed onClick={() => setHidePassword(false)}></IconEyeClosed>
        ) : (
          <IconEyeOpen onClick={() => setHidePassword(true)}></IconEyeOpen>
        )}
      </Input>
    </>
  );
};

export default InputPassword;
