import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import Drop from "../Properties/DropZone/Drop";
import uniqid from "uniqid";
import { appendImage } from "../../api/api";
import { Alert, Button, LinearProgress } from "@mui/material";
import { Upload, UploadFile } from "@mui/icons-material";
import toast from "react-hot-toast";

const UploadBanners = () => {
  const [image, setImage] = useState({
    src: "https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png",
  });
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const genratedID = uniqid();
    setLoading(true);
    try {
      if (image.file) {
        let storageRef = ref(storage, genratedID);

        await uploadBytes(storageRef, image.file);
        console.log("Uploaded a blob or file!");
        const URL = await getDownloadURL(storageRef);
        if (URL) {
          appendImage(URL, genratedID);
          toast.success("Image was uploaded successfully!!");

          setImage({
            src: "https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png",
          });
        } else {
          console.log("Image Failed To Upload");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Drop setImage={setImage} image={image} />
      {loading && <LinearProgress sx={{ my: 2 }} />}
      {image.file && (
        <Button
          onClick={handleUpload}
          startIcon={<Upload />}
          sx={{
            my: 2,
          }}
          fullWidth
          variant="contained"
        >
          Upload{" "}
        </Button>
      )}
    </div>
  );
};

export default UploadBanners;
