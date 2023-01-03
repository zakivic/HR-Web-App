import * as Yup from "yup";

export const trainingSchema = Yup.object().shape({
  employee: Yup.string().required("Employee name is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  course: Yup.string().required("Course name is required"),
  trainer: Yup.string().required("Trainer name is required"),
  location: Yup.string().required("Location is required"),
});
