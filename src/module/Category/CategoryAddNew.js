import { Button } from "components/Button";
import { Field, FieldCheckbox } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { categoryStatus } from "utils/constants";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import * as yup from "yup";
import DashboardHeading from "./DashboardHeading";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object({
  name: yup
    .string()
    .required("Please enter category's name")
    .max(20, "Your category must be less than 20 characters"),
  slug: yup.string(),
  status: yup.number().oneOf([1, 2]),
});
const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const watchStatus = Number(watch("status"));
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
  const handleAddCategory = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.name, {
      lower: true,
    });
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Created new category successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckbox className="my-5">
            <Label>Status:</Label>
            <FieldCheckbox>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === categoryStatus.PENDING}
                value={categoryStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === categoryStatus.REJECTED}
                value={categoryStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckbox>
          </FieldCheckbox>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
