import * as Yup from "yup";

export const performanceInitialValues = {
  employee: "",
  reviewDate: new Date(),
  manager: "",
  strengths: "",
  areasForImprovement: "",
  goals: "",
  overallRating: 1,
};

export const performanceValidationSchema = Yup.object().shape({
  employee: Yup.string().label("Employee").required("Employee is required"),
  reviewDate: Yup.date()
    .label("Review Date")
    .required("Review date is required"),
  manager: Yup.string().label("Manager").required("Manager is required"),
  strengths: Yup.string().label("Strengths").required("Strengths is required"),
  areasForImprovement: Yup.string()
    .label("Areas for Improvement")
    .required("Areas for Improvement is required"),
  goals: Yup.string().label("Goals").required("Goals is required"),
  overallRating: Yup.number()
    .label("Overall Rating")
    .required("Overall rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

// export const performanceValidationSchema = Yup.object({
//   employee: Yup.string().required("Employee is required"),
//   reviewDate: Yup.date().required("Review date is required"),
//   manager: Yup.string().required("Manager is required"),
//   strengths: Yup.string().required("Strengths is required"),
//   areasForImprovement: Yup.string().required(
//     "Areas for Improvement is required"
//   ),
//   goals: Yup.string().required("Goals is required"),
//   overallRating: Yup.number()
//     .required("Overall rating is required")
//     .min(1, "Rating must be between 1 and 5")
//     .max(5, "Rating must be between 1 and 5"),
// });
