import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { DeleteRounded } from "@mui/icons-material";
import { deleteObject, ref } from "firebase/storage";

const Banners = () => {
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "images"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setImages(fetchedData);
    }
    fetchData();
  }, []);

  const updateImages = async (image) => {
    console.log(image);
    const imagesCopy = [...images];
    const filteredData = imagesCopy.map((img) => {
      if (img.id === image.id) {
        return {
          ...img,
          selected: !image.selected,
        };
      } else return img;
    });
    setImages(filteredData);
    try {
      const imageRef = doc(db, "images", image.id);

      await setDoc(imageRef, { selected: !image.selected }, { merge: true });
    } catch (error) {
      console.log(error);
      setImages(imagesCopy);
    }
  };

  const deleteImage = async (image) => {
    try {
      let storageRef = ref(storage, image.id);

      await deleteObject(storageRef);
      await deleteDoc(doc(db, "images", image.id));
      const filteredData = images.filter((img) => img.id !== image.id);
      setImages(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="banner">
      <ImageList
        images={images}
        updateImages={updateImages}
        deleteImage={deleteImage}
      />
    </div>
  );
};

export default Banners;

const Image = ({ image, updateImages, deleteImage }) => {
  return (
    <div
      className="file-item"
      onClick={() => {
        updateImages(image);
      }}
    >
      <IconButton
        className="file-item-delete-icon"
        aria-label="delete"
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 999,
        }}
        onClick={(e) => {
          e.stopPropagation();
          deleteImage(image);
        }}
      >
        <DeleteRounded
          sx={{
            color: "#ff0000",
          }}
        />
      </IconButton>
      {image.selected && (
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#0000005a",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
            }}
            color="white"
          >
            Selected
          </Typography>
        </Box>
      )}
      <img
        loading="lazy"
        alt={`img -${image.id} `}
        src={image.url}
        className="file-img"
      />
    </div>
  );
};

const ImageList = ({ images, updateImages, deleteImage }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
        updateImages={updateImages}
        deleteImage={deleteImage}
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};
