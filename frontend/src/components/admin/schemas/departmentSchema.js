import * as Yup from "yup";

export const departmentInitialValues = { name: "", manager: "", employees: "" };

export const departmentValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").label("Department Name"),
  manager: Yup.string().label("Manager"),
  employees: Yup.array().label("Employees"),
});
