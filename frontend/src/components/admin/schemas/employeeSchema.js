import * as Yup from "yup";

export const employeeInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  homePhone: "",
  hireDate: new Date(),
  department: "",
  jobTitle: "",
  nationalIDNumber: "",
  socialSecurityNumber: "",
  nationality: "",
  gender: "",
  address: "",
  photo: "",
  bloodType: "",
  educationStatus: "",
  militaryStatus: "",
  martialStatus: "",
};

export const employeeValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobilePhone: Yup.string().required("Mobile phone is required"),
  homePhone: Yup.string(),
  hireDate: Yup.date().required("Hire date is required"),
  department: Yup.string().required("Department is required"),
  jobTitle: Yup.string().required("Job title is required"),
  nationalIDNumber: Yup.string().required("National ID number is required"),
  socialSecurityNumber: Yup.string().required(
    "Social security number is required"
  ),
  nationality: Yup.string().required("Nationality is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  photo: Yup.mixed().required("Photo is required"),
  bloodType: Yup.string().required("Blood type is required"),
  educationStatus: Yup.string().required("Education status is required"),
  militaryStatus: Yup.string().required("Military status is required"),
  martialStatus: Yup.string().required("Martial status is required"),
});
