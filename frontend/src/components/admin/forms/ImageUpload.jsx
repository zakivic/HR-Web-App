import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Field } from "formik";

const ImageBox = styled(Box)(({ theme }) => ({
  border: "dashed grey",
  borderWidth: 2,
  borderRadius: 5,
  borderColor: "lightblue",
  width: "100%",
  height: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const successBox = {
  borderColor: "lightgreen",
  // backgroundColor: "lightgreen",
};

const errorBox = {
  borderColor: "lightcoral",
  // backgroundColor: "lightcoral",
};

const ImageDropZone = (props) => {
  const { field, form, label, required, setFieldValue, formControlProps } =
    props;
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");

  const nbrOfFilesError = "You can only upload one file at a time";
  const filesTypeError = "Only image files can be uploaded";
  console.log(form);
  const handleDrop = (e) => {
    e.preventDefault();
    setStatus("");
    setErrorMessage("");

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length !== 1) {
      setErrorMessage(nbrOfFilesError);
      setFile(null);
      return;
    }

    const file = droppedFiles[0];
    if (file.type.split("/")[0] !== "image") {
      setErrorMessage(filesTypeError);
      setFile(null);
      return;
    }

    setFile(file);
    setFieldValue(field.name, file);
    setStatus("success");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = (e) => {
      const files = e.target.files;
      if (files.length !== 1) {
        setErrorMessage(nbrOfFilesError);
        setFile(null);
        setStatus("error");
        return;
      }
      const file = files[0];
      if (file.type.split("/")[0] !== "image") {
        setErrorMessage(filesTypeError);
        setFile(null);
        setStatus("error");
        return;
      }
      setFile(file);
      setFieldValue(field.name, file);
      setStatus("success");
      setErrorMessage("");
    };
  };

  let errorPool;

  if (form.errors[field.name] && form.touched[field.name]) {
    errorPool = form.errors[field.name];
  } else if (errorMessage) {
    errorPool = errorMessage;
  } else {
    errorPool = null;
  }

  let boxStyle;
  switch (status) {
    case "success":
      boxStyle = successBox;
      break;
    case "error":
      boxStyle = errorBox;
      break;
    default:
      boxStyle = null;
  }

  return (
    <FormControl required={required} {...formControlProps}>
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        <ImageBox
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
          sx={boxStyle}
        >
          {file ? (
            <Typography variant="h6">{file.name}</Typography>
          ) : (
            <Stack direction={"column"} alignItems="center">
              <Typography variant="h6">
                Drag and drop a file here or click to select a file
              </Typography>
              <Typography variant="caption">
                (only image files are allowed, only one file can be selected)
              </Typography>
            </Stack>
          )}
        </ImageBox>
        {errorPool && <FormHelperText error>{errorPool}</FormHelperText>}
        <Field type="hidden" name={field.name} />
      </FormGroup>
    </FormControl>
  );
};

export default ImageDropZone;
