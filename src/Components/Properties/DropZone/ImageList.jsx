import { DeleteRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const Image = ({ image, filterImages }) => {
  return (
    <div className="file-item">
      <IconButton
        className="file-item-delete-icon"
        aria-label="delete"
        sx={{
          position: "absolute",
          right: 0,
        }}
        onClick={() => filterImages(image.id)}
      >
        <DeleteRounded
          sx={{
            color: "#ff0000",
          }}
        />
      </IconButton>
      <img alt={`img -${image.id} `} src={image.src} className="file-img" />
    </div>
  );
};

const ImageList = ({ images, filterImages }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
        filterImages={filterImages}
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;
