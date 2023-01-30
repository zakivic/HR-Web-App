import CommonTextField from "./CommonTextField";
import SearchForEmployee from "./SearchForEmployee";

const DepartmentForm = (props) => {
  const { errors, touched, values, setFieldValue, setFieldTouched } = props;

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
      {/* <CommonTextField
        fieldName="manager"
        fieldLabel="Manager"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      /> */}
      <SearchForEmployee
        fieldName="manager"
        fieldLabel="Manager"
        values={values}
        setFieldValue={setFieldValue}
      />
      {/* <CommonTextField
        fieldName="employees"
        fieldLabel="Employees"
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
      /> */}
      <SearchForEmployee
        fieldName="employees"
        fieldLabel="Employees"
        values={values}
        setFieldValue={setFieldValue}
        multiSelect
      />
    </>
  );
};

export default DepartmentForm;
