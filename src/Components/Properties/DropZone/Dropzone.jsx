import React from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Stack, Button } from "@mui/material";
export const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
    },
  });
  const getClassName = (className, isActive) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
  };
  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      {isDragActive ? (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={2}
        >
          <Typography variant="h5">Release to drop the files here</Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={2}
        >
          <Typography variant="h5">
            Drag and drop files here to upload
          </Typography>
          <Typography variant="h5">(or)</Typography>
          <Button
            type="button"
            variant="contained"
            onClick={open}
            color="inherit"
          >
            Select files to upload
          </Button>
        </Stack>
      )}
    </div>
  );
};
