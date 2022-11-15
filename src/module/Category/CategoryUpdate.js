import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/Button";
import { Field, FieldCheckbox } from "components/Field";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { Radio } from "components/Radio";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryUpdateSchema } from "schema/schema";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import DashboardHeading from "./DashboardHeading";

const CategoryUpdate = () => {
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
    resolver: yupResolver(categoryUpdateSchema),
  });
  const categoryId = searchParams.get("id");
  const categoryName = searchParams.get("name");
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
  useEffect(() => {
    async function getCurrentCategoryValue() {
      const docRef = doc(db, "categories", categoryId);
      await getDoc(docRef).then((doc) => {
        reset(doc.data());
      });
    }
    getCurrentCategoryValue();
  }, [categoryId, reset]);
  const watchStatus = Number(watch("status"));
  const handleUpdateCategory = async (values) => {
    const cloneValues = { ...values };
    const docRef = doc(db, "categories", categoryId);
    await updateDoc(docRef, {
      name: cloneValues.name,
      slug: slugify(cloneValues.name, { lower: true }),
      status: Number(cloneValues.status),
    });
    toast.success("Update category successfully", {
      closeOnClick: true,
    });
    navigate("/manage/category");
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title={`Things always need to be updated huh?
        `}
        desc={`Updating category: ${categoryName}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
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
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {`Update ${categoryName} Category`}
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
