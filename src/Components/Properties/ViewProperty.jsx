import {
  Button,
  Card,
  Chip,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../../firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import {
  Bathroom,
  Bed,
  Delete,
  HideSource,
  Map,
  SquareFoot,
  Visibility,
} from "@mui/icons-material";
import Images from "./ImagesCarousel";
import CustomPaginationActionsTable from "./Transactions";
import HorizontalLinearStepper from "./Stepper";
import {
  blockUser,
  deleteCourse,
  fetchTransaction,
  hidePropertyFn,
} from "../../api/api";

const ViewProperty = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  console.log(property);

  const [about, setAbout] = useState("");
  const { properties, setProperties } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (propertyId && properties.length > 0) {
      const property = properties.find(
        (property) => property.id === propertyId
      );
      if (property) {
        setProperty(property);
        setAbout(property.about);
        setOwnerBlocked(property.isOwnerBlocked || false);
        setTenantBlocked(property.isTenantBlocked || false);
        setHideProperty(property.hideProperty || false);
        setImages(
          property.images.map((image, idx) => ({
            src: image,
            id: idx,
            file: null,
          }))
        );
      } else {
      }
    } else {
      setProperty(null);
      setAbout("");
      setImages([]);
      console.log("Create Property Page");
    }
  }, [propertyId, properties]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTransaction(propertyId);
      console.log(data);
      setRows(data?.rows || []);
    }
    if (propertyId) {
      fetchData();
    }
  }, [propertyId]);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchedProperties = [];
    console.log("Fetching reports");

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "reports"));
      querySnapshot.forEach((doc) => {
        if (doc.data().propertyId === propertyId)
          fetchedProperties.push(doc.data());
      });
      setReports(fetchedProperties);
    }
    fetchData();
  }, []);

  const handelDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this property?") === true
    ) {
      const data = await deleteCourse(property.id);
      if (data) {
        setProperties((properties) =>
          properties.filter((crs) => crs.id !== property.id)
        );
      }
    }
  };
  const handleHide = async () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          hideProperty === true ? "Show" : "Hide"
        } this property?`
      ) === true
    ) {
      const data = await hidePropertyFn(property.id, !hideProperty);
      if (data) {
        setHideProperty(!hideProperty);
      }
    }
  };

  const [ownerBlocked, setOwnerBlocked] = React.useState(false);

  const [hideProperty, setHideProperty] = useState(false);

  const ownerChange = (event, uid) => {
    setOwnerBlocked(event.target.checked);
    blockUser(uid, event.target.checked, propertyId, "OWNER");
  };

  const [tenantBlocked, setTenantBlocked] = useState(false);

  const tenantChange = (event, uid) => {
    setTenantBlocked(event.target.checked);
    blockUser(uid, event.target.checked, propertyId, "OWNER");
  };
  return (
    <>
      {!!property ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="h1"
            className="test"
            gutterBottom
          >
            {property?.name}
          </Typography>

          <Box sx={{ maxWidth: 960, margin: "auto", my: 2 }}>
            <Grid container>
              {property.images.length > 0 ? (
                <Grid item xs={12}>
                  <Images images={property.images} />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    pt: 0,
                    minHeight: "360px",
                  }}
                >
                  <Typography variant="subtitle1" component="div">
                    <span
                      style={{
                        color: "blueviolet",
                        fontSize: "2rem",
                      }}
                    >
                      ${property.price}
                    </span>{" "}
                    USD/Month
                  </Typography>

                  <Stack
                    direction={"row"}
                    sx={{ my: 2, flexWrap: "wrap" }}
                    spacing={1}
                  >
                    <Chip
                      icon={<Bed />}
                      label={property?.beds + " bedroom"}
                      variant="outlined"
                      color="info"
                    />
                    <Chip
                      icon={<Bathroom />}
                      label={property?.bath + " bathroom"}
                      variant="outlined"
                      color="info"
                    />
                    <Chip
                      icon={<SquareFoot />}
                      label={property?.sft + " sqft"}
                      variant="outlined"
                      color="info"
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{ my: 2, alignItems: "center" }}
                    spacing={1}
                  >
                    <Typography variant="body1" component="div">
                      {property.location}
                    </Typography>{" "}
                    <Map color="primary" />
                  </Stack>

                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{
                      __html: property.about,
                    }}
                  />

                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      startIcon={<Visibility />}
                      onClick={() => {
                        navigate(`/property/${property.id}`);
                      }}
                      variant="contained"
                    >
                      Update Property
                    </Button>
                    <Button
                      startIcon={<HideSource />}
                      color="secondary"
                      onClick={handleHide}
                      variant="contained"
                    >
                      {hideProperty === true ? "Show" : "Hide"} Property
                    </Button>
                    <Button
                      startIcon={<Delete />}
                      onClick={handelDelete}
                      variant="outlined"
                      color="error"
                    >
                      Delete Property
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container gap={4} sx={{ maxWidth: 1080, margin: "auto" }}>
            <Grid item xs={5}>
              <Card
                elevation={3}
                sx={{
                  marginLeft: "auto",
                  maxWidth: 300,
                  my: 2,
                  ml: 10,
                  p: 2,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    color: "#1e88e5",
                  }}
                >
                  Tenant Details
                </Typography>
                {property.TENANT ? (
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      Name:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.TENANT?.firstName}
                      </span>{" "}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      Email:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.TENANT?.email}
                      </span>{" "}
                    </Typography>

                    <Switch
                      checked={tenantBlocked}
                      onChange={(e) => {
                        tenantChange(e, property.TENANT.uid);
                      }}
                    />
                    <Typography variant="subtitle1" component="span">
                      {tenantBlocked ? "Unblock Tenant" : "Block Tenant"}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="subtitle1" component="h1">
                    No Tenant
                  </Typography>
                )}
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card
                elevation={3}
                sx={{
                  marginLeft: "auto",
                  maxWidth: 300,
                  my: 2,
                  ml: 10,
                  p: 2,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    color: "#1e88e5",
                  }}
                >
                  Owner Details
                </Typography>
                {property.OWNER.role === "ADMIN" ? (
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      Name:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.OWNER.firstName}
                      </span>{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      Name:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.OWNER.firstName} {property.OWNER.lastName}
                      </span>{" "}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      Email:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.OWNER.email}
                      </span>{" "}
                    </Typography>
                    {/* <Typography variant="subtitle1" component="div">
                      Phone:{" "}
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {property.OWNER.phone || "-"}
                      </span>{" "}
                    </Typography> */}
                    <Typography variant="subtitle1" component="span">
                      {ownerBlocked ? "Unblock Owner" : "Block Owner"}
                    </Typography>
                    <Switch
                      checked={ownerBlocked}
                      onChange={(e) => {
                        ownerChange(e, property.OWNER.uid);
                      }}
                    />
                  </Box>
                )}
              </Card>
            </Grid>
            {rows?.length > 0 && (
              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      color: "#1e88e5",
                    }}
                  >
                    Recent Payments
                  </Typography>
                  <CustomPaginationActionsTable rows={rows} />
                </Card>
              </Grid>
            )}

            {reports.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      color: "#1e88e5",
                    }}
                  >
                    Maintanance Report
                  </Typography>
                  {reports?.map((report, idx) => (
                    <Card
                      elevation={3}
                      sx={{ margin: "auto", my: 3, position: "relative" }}
                      key={idx}
                    >
                      <Grid container>
                        {report.images.length > 0 ? (
                          <Grid item xs={6}>
                            <Images images={report.images} />
                          </Grid>
                        ) : null}
                        <Grid item xs={6} sx={{ p: 1.5 }}>
                          <Typography sx={{ mb: 2 }}>{report.about}</Typography>
                          <HorizontalLinearStepper
                            report={report}
                            setReports={setReports}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      ) : null}
    </>
  );
};

export default ViewProperty;
