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
  firstName: Yup.string()
    .required("First name is required")
    .label("First Name"),
  lastName: Yup.string().required("Last name is required").label("Last Name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .label("Email"),
  mobilePhone: Yup.string()
    .required("Mobile phone is required")
    .label("Mobile Phone"),
  homePhone: Yup.string().label("Home Phone"),
  hireDate: Yup.date().required("Hire date is required").label("Hire Date"),
  department: Yup.string()
    .required("Department is required")
    .label("Department"),
  jobTitle: Yup.string().required("Job title is required").label("Job Title"),
  nationalIDNumber: Yup.string()
    .required("National ID number is required")
    .label("National ID Number"),
  socialSecurityNumber: Yup.string()
    .required("Social security number is required")
    .label("Social Security Number"),
  nationality: Yup.string()
    .required("Nationality is required")
    .label("Nationality"),
  gender: Yup.string().required("Gender is required").label("Gender"),
  address: Yup.string().required("Address is required").label("Address"),
  photo: Yup.mixed().required("Photo is required").label("Photo"),
  bloodType: Yup.string()
    .required("Blood type is required")
    .label("Blood Type"),
  educationStatus: Yup.string()
    .required("Education status is required")
    .label("Education Status"),
  militaryStatus: Yup.string()
    .required("Military status is required")
    .label("Military Status"),
  martialStatus: Yup.string()
    .required("Martial status is required")
    .label("Martial Status"),
});
