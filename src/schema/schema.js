import { userRole, userStatus } from "utils/constants";
import * as yup from "yup";

export const signUpSchema = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .max(24, "Your username should be less than 30 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Your email address is invalid, please enter another one"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please re-confirm your password")
    .oneOf(
      [yup.ref("password"), null],
      "Your confirm password doesn't match your password, please re-check!"
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Your email address is invalid, enter another one"),
  password: yup.string().required("Please enter your password"),
});

export const postAddNewSchema = yup.object({
  title: yup
    .string()
    .required("Please enter your post's title")
    .min(8, "Your title must be longer than 8 characters"),
  slug: yup.string(),
  status: yup.number().oneOf([1, 2, 3]),
  category: yup.object().required("Please select an category"),
  popular: yup.bool().required("Is this post a popular one?"),
});

export const categoryAddNewSchema = yup.object({
  name: yup
    .string()
    .required("Please enter category's name")
    .max(20, "Your category must be less than 20 characters"),
  slug: yup.string(),
  status: yup.number().oneOf([1, 2]),
});

export const categoryUpdateSchema = yup.object({
  name: yup.string().required("Please enter category's name"),
  status: yup.number().oneOf([1, 2, 3]),
});

export const userUpdateSchema = yup.object({
  username: yup
    .string()
    .required("Please enter the username")
    .min(3, "Username is too short (must be more than 3 characters)"),
  email: yup
    .string()
    .required("Please enter the e-mail address")
    .email("Your e-mail address is invalid, please enter another one"),
  bio: yup.string(),
  status: yup
    .number()
    .oneOf([userStatus.ACTIVE, userStatus.PENDING, userStatus.BANNED])
    .required("Your post's status is invalid"),
  role: yup
    .number()
    .oneOf([userRole.ADMIN, userRole.MOD, userRole.USER])
    .required("Your user's role is invalid"),
});

export const userAddNewSchema = yup.object({
  username: yup
    .string()
    .required("Please enter an appropriate username!")
    .max(24, "Username must be less than 24 characters"),
  email: yup
    .string()
    .required("Please enter an e-mail address")
    .email("The email you entered is invalid, please enter another one"),
  password: yup
    .string()
    .required("Please enter an appropriate password")
    .min(8, "Your password must be at least 8 characters"),
  status: yup.number().oneOf([1, 2, 3]),
  role: yup
    .number()
    .required("Pleaes select a role for your user")
    .oneOf([userRole.ADMIN, userRole.MOD, userRole.USER]),
});

export const userProfileSchema = yup.object({
  username: yup
    .string()
    .required("Please enter an appropriate username!")
    .max(24, "Username must be less than 24 characters"),
  birthday: yup.date(),
  phone: yup.number().max(16, "Your phone number must be less than 16 numbers"),
});
