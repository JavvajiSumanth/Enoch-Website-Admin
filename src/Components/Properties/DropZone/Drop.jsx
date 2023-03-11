import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { Dropzone } from "./Dropzone";
import ImageList from "./ImageList";

function Drop({ user, setImages, images }) {
  // const [img, setImg] = useState(images);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const uid = uuid();
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { src: e.target.result, id: uid, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const filterImages = (id) => {
    setImages((prevState) => prevState.filter((img) => img.id !== id));
  };

  return (
    <div className="drop">
      {images.length > 0 && (
        <ImageList images={images} filterImages={filterImages} />
      )}

      <Dropzone onDrop={onDrop} />
    </div>
  );
}

export default Drop;
