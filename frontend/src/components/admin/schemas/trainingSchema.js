import * as Yup from "yup";

export const trainingInitialValues = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  course: "",
  instructor: "",
  location: "",
  employees: "",
};

export const trainingValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").label("Name"),
  startDate: Yup.date().required("Start date is required").label("Start Date"),
  endDate: Yup.date()
    .required("End date is required")
    .min(
      Yup.ref("startDate"),
      "End date must be later than or equal to start date"
    )
    .label("End Date"),
  course: Yup.string().required("Course name is required").label("Course"),
  instructor: Yup.string()
    .required("Instructor name is required")
    .label("Instructor"),
  location: Yup.string().required("Location is required").label("Location"),
  employees: Yup.array().label("Employees"),
});
// export const trainingValidationSchema = Yup.object({
//   employee: Yup.string().required("Employee name is required"),
//   startDate: Yup.date().required("Start date is required"),
//   endDate: Yup.date()
//     .required("End date is required")
//     .min(
//       Yup.ref("startDate"),
//       "End date must be later than or equal to start date"
//     ),
//   course: Yup.string().required("Course name is required"),
//   trainer: Yup.string().required("Trainer name is required"),
//   location: Yup.string().required("Location is required"),
// });
