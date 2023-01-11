import { TextField } from "@mui/material";
import { Field } from "formik";

const CommonTextField = (porps) => {
  const { required, fieldName, fieldLabel, setFieldTouched, touched, errors } =
    porps;
  return (
    <Field
      required={required}
      name={fieldName}
      label={fieldLabel}
      type="text"
      fullWidth
      as={TextField}
      error={Boolean(touched[fieldName] && errors[fieldName])}
      helperText={touched[fieldName] && errors[fieldName]}
      onBlur={() => setFieldTouched(fieldName, true)}
    />
  );
};

export default CommonTextField;
