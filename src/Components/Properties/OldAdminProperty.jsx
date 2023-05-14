import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useScriptRef from "../../Helpers/useScriptRef";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CloseOutlined } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import uniqid from "uniqid";
import { AuthContext } from "../../context/AuthContext";
import Drop from "./DropZone/Drop";
import { Autocomplete } from "@react-google-maps/api";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["mapLink", "video"],
    ["clean"],
  ],
};
const OldAdminProperty = () => {
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);

  const [about, setAbout] = useState("");
  const { properties, setProperties, user } = useContext(AuthContext);

  const scriptedRef = useScriptRef();

  const navigate = useNavigate();
  useEffect(() => {
    setProperty(null);
    setAbout("");
    setImages([]);
  }, []);

  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handelFormSubmit = async (values) => {
    console.log(user);
    setLoading(true);
    try {
      const propertyObj = {
        ...values,
        about,
      };
      delete propertyObj.submit;
      const uploadingImages = [];
      const pics = [];
      for (let _ = 0; _ < images.length; _++) {
        const element = images[_];
        if (element.file) {
          uploadingImages.push(element);
        } else {
          pics.push(element.src);
        }
      }
      for await (const key of uploadingImages) {
        try {
          const url = await onSubmitFile(key);
          pics.push(url);
        } catch (error) {
          console.log(error);
        }
      }
      propertyObj.images = pics;
      propertyObj.location = location;

      propertyObj.OWNER = {
        email: values.ownerEmail,
        firstName: values.ownerName,
        phone: values.ownerPhone,
        lastName: "",
        uid: "",
        role: "OWNER",
      };
      propertyObj.TENANT = {
        email: values.tenantEmail,
        firstName: values.tenantName,
        phone: values.tenantPhone,
        lastName: "",
        uid: "",
        role: "TENANT",
      };
      await createProperty(propertyObj);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setUpdated(true);
  };
  const onSubmitFile = async ({ file, id }) => {
    let url = null;
    try {
      if (file) {
        let storageRef = ref(storage, `posts/${id}`);
        await uploadBytes(storageRef, file);

        console.log("Uploaded a blob or file!");
        url = await getDownloadURL(storageRef);
        console.log(url);
      }
    } catch (error) {
      console.log(error);
    }
    return url;
  };

  const createProperty = async (propObj) => {
    const genratedID = uniqid();
    propObj.id = genratedID;
    propObj.date = new Date();

    const courseRef = doc(db, "properties", genratedID);
    await setDoc(courseRef, propObj);

    setProperties((properties) => [...properties, propObj]);
  };
  const [location, setLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    setLocation(autocomplete.getPlace().formatted_address);
  };
  return (
    <Box
      sx={{
        py: "20px",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h1"
          className="test"
          gutterBottom
        >
          Add Existing Property
        </Typography>
        <Formik
          initialValues={{
            name: property?.name || "",
            price: property?.price || "",
            sft: property?.sft || "",
            beds: property?.beds || "",
            bath: property?.bath || "",
            mapLink: property?.mapLink || "",
            propertyType: property?.propertyType || "",
            pets: property?.pets || "",
            ownerName: property?.ownerName || "",
            ownerEmail: property?.ownerEmail || "",
            ownerPhone: property?.ownerPhone || "",
            tenantName: property?.tenantName || "",
            tenantEmail: property?.tenantEmail || "",
            tenantPhone: property?.tenantPhone || "",
            submit: null,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().min(3).max(50).required("Name is required"),
            price: Yup.number().required("Price is required"),
            sft: Yup.number().required("SFT is required"),
            beds: Yup.number().required("Beds count is required"),
            bath: Yup.number().required("Bathroom count is required"),
            mapLink: Yup.string().required("Maps Link is required"),
            ownerName: Yup.string().required("Owner Name is required"),
            ownerEmail: Yup.string().required("Owner Email is required"),
            ownerPhone: Yup.string().required("Owner Phone is required"),
            tenantName: Yup.string().required("Tenant Name is required"),
            tenantEmail: Yup.string().required("Tenant Email is required"),
            tenantPhone: Yup.string().required("Tenant Phone is required"),
            propertyType: Yup.string().required(
              "Property Type Feild is required"
            ),
            pets: Yup.string().required("Pets Feild is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(true);
                handelFormSubmit(values);
              }
            } catch (err) {
              console.error(err);
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Property Title
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography variant="subtitle1" sx={{ my: 1 }} component="legend">
                About the property
              </Typography>
              <ReactQuill
                modules={modules}
                theme="snow"
                onChange={setAbout}
                placeholder="Content goes here..."
                value={about}
              />

              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                }}
              >
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      $ Rent Amount
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.price && errors.price && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.beds && errors.beds)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      No of Bed's
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.beds}
                      name="beds"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.beds && errors.beds && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.beds}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.bath && errors.bath)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      No of Bath's
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.bath}
                      name="bath"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.bath && errors.bath && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.bath}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                  placeItems: "center",
                }}
              >
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.sft && errors.sft)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      SFT
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.sft}
                      name="sft"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.sft && errors.sft && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.sft}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.propertyType && errors.propertyType)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Property Type
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.propertyType && errors.propertyType)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <Select
                      value={values.propertyType}
                      label="Property Type"
                      name="propertyType"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value={"Single Family Home"}>
                        Single Family Home
                      </MenuItem>
                      <MenuItem value={"Apartment"}>Apartment</MenuItem>
                      <MenuItem value={"Condo"}>Condo</MenuItem>
                      <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
                      <MenuItem value={"Duplex"}>Duplex</MenuItem>
                      <MenuItem value={"Multiplex"}>Multiplex</MenuItem>
                      <MenuItem value={"Loft"}>Loft</MenuItem>
                      <MenuItem value={"Mobile Home"}>Mobile Home</MenuItem>
                    </Select>

                    {touched.propertyType && errors.propertyType && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.propertyType}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.pets && errors.pets) ? "#f44336" : ""
                    }
                  >
                    Pets
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.pets && errors.pets)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <Select
                      value={values.pets}
                      label="Pets"
                      name="pets"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value={"Dogs Allowed"}>Dogs Allowed</MenuItem>

                      <MenuItem value={"No Pets Allowed"}>
                        No Pets Allowed
                      </MenuItem>
                    </Select>

                    {touched.pets && errors.pets && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.pets}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                  placeItems: "center",
                }}
              >
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.ownerName && errors.ownerName)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Owner Name
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.ownerName && errors.ownerName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Owner Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.ownerName}
                      name="ownerName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.ownerName && errors.ownerName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.ownerName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.ownerEmail && errors.ownerEmail)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Owner Email
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.ownerEmail && errors.ownerEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Owner Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.ownerEmail}
                      name="ownerEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.ownerEmail && errors.ownerEmail && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.ownerEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.ownerPhone && errors.ownerPhone)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Owner Phone
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.ownerPhone && errors.ownerPhone)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Owner Phone
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.ownerPhone}
                      name="ownerPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.ownerPhone && errors.ownerPhone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.ownerPhone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                  placeItems: "center",
                }}
              >
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.tenantName && errors.tenantName)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Tenant Name
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.tenantName && errors.tenantName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Tenant Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.tenantName}
                      name="tenantName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.tenantName && errors.tenantName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.tenantName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.tenantEmail && errors.tenantEmail)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Tenant Email
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.tenantEmail && errors.tenantEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Tenant Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.tenantEmail}
                      name="tenantEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.tenantEmail && errors.tenantEmail && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.tenantEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle1"
                    color={
                      Boolean(touched.tenantPhone && errors.tenantPhone)
                        ? "#f44336"
                        : ""
                    }
                  >
                    Tenant Phone
                  </Typography>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.tenantPhone && errors.tenantPhone)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Tenant Phone
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.tenantPhone}
                      name="tenantPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.tenantPhone && errors.tenantPhone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.tenantPhone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    name="location"
                    onBlur={handleBlur}
                    inputProps={{}}
                    fullWidth
                  />
                </Autocomplete>

                {location?.length <= 0 && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    Required
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.mapLink && errors.mapLink)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Link
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="text"
                  value={values.mapLink}
                  name="mapLink"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.mapLink && errors.mapLink && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.mapLink}
                  </FormHelperText>
                )}
              </FormControl>

              <Drop setImages={setImages} images={images} />
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              {/* {!!error && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText
                    sx={{
                      textAlign: "center",
                    }}
                    error
                  >
                    {error}
                  </FormHelperText>
                </Box>
              )} */}
              {loading ? (
                <LinearProgress sx={{ my: 2 }} color="secondary" />
              ) : null}
              <Collapse in={updated}>
                <Alert
                  color="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="info"
                      size="small"
                      onClick={() => {
                        setUpdated(false);
                      }}
                    >
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Property Created Successfully!!
                </Alert>
              </Collapse>
              {!updated ? (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <Button
                    // disabled
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Create Property
                  </Button>
                  <Button
                    // disabled
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <Button
                    disableElevation
                    // disabled
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Go Back
                  </Button>
                </Stack>
              )}
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default OldAdminProperty;
