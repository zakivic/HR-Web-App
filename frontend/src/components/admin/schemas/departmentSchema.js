import * as Yup from "yup";

export const departmentInitialValues = { name: "", manager: "", employees: "" };

export const departmentValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  manager: Yup.string(),
  employees: Yup.string(),
});
