export const createInitialValues = (data, validationSchema) => {
  const initialValues = {};
  const fields = validationSchema.fields;
  Object.keys(fields).forEach((key) => {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        //This is temporary to baypass error
        //until adding employees logic
        initialValues[key] = "";
      } else {
        initialValues[key] = data[key];
      }
    } else {
      initialValues[key] = "";
    }
  });

  console.log(initialValues);
  return initialValues;
};
