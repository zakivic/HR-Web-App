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
  const { field, form, label, required, setFieldValue } = props;
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");

  const nbrOfFilesError = "You can only upload one file at a time";
  const filesTypeError = "Only image files can be uploaded";

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

    setFileToBase64(file);
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

      setFileToBase64(file);
      setErrorMessage("");
    };
  };

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const photoBase64 = reader.result;
      setFile(file);
      setFieldValue(field.name, photoBase64);
      setStatus("success");
    };
  };

  let errorPool = null;

  if (form.errors[field.name] && form.touched[field.name]) {
    errorPool = form.errors[field.name];
  } else if (errorMessage) {
    errorPool = errorMessage;
  }

  let boxStyle = null;
  if (status === "success") {
    boxStyle = successBox;
  } else if (
    status === "error" ||
    (form.errors[field.name] && form.touched[field.name])
  ) {
    boxStyle = errorBox;
  }

  return (
    <FormControl required={required}>
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
      </FormGroup>
    </FormControl>
  );
};

export default ImageDropZone;
