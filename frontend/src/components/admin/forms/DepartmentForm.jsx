import CommonTextField from "./CommonTextField";

const DepartmentForm = (props) => {
  const { errors, touched, setFieldTouched } = props;

  return (
    <>
      <CommonTextField
        required={true}
        fieldName="name"
        fieldLabel="Name"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
      <CommonTextField
        fieldName="manager"
        fieldLabel="Manager"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
      <CommonTextField
        fieldName="employees"
        fieldLabel="Employees"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    </>
  );
};

export default DepartmentForm;
