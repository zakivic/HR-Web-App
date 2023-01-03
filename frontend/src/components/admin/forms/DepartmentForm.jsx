import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const DepartmentForm = (props) => {
  const { formData, setFormData } = props;
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    manager: Yup.string(),
    employees: Yup.number().typeError("Employees must be a number"),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // submit form data here
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field
            name="name"
            render={({ field, form }) => (
              <TextField
                required
                name={field.name}
                label="Name"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={touched.name && errors.name ? true : false}
                helperText={touched.name && errors.name ? errors.name : null}
              />
            )}
          />
          <Field
            name="manager"
            render={({ field, form }) => (
              <TextField
                name={field.name}
                label="Manager"
                type="text"
                fullWidth
                value={formData.manager}
                onChange={handleChange}
                error={touched.manager && errors.manager ? true : false}
                helperText={
                  touched.manager && errors.manager ? errors.manager : null
                }
              />
            )}
          />
          <Field
            name="employees"
            render={({ field, form }) => (
              <TextField
                name={field.name}
                label="Employees"
                type="text"
                fullWidth
                value={formData.employees}
                onChange={handleChange}
                error={touched.employees && errors.employees ? true : false}
                helperText={
                  touched.employees && errors.employees
                    ? errors.employees
                    : null
                }
              />
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DepartmentForm;
