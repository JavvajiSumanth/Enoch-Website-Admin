import * as React from "react";

import Typography from "@mui/material/Typography";
import { Button, Grid, Paper } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import SingleRequest from "./SingleRequest";

export default function Requests() {
  const [tenants, setTenants] = React.useState([]);

  React.useEffect(() => {
    const fetchedData = [];
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "tenants"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setTenants(fetchedData);
    }
    fetchData();
  }, []);
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          my: 3,
        }}
      >
        Recently Requested Tenants
      </Typography>
      <Grid
        container
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {tenants.map((tenant, idx) => (
          <SingleRequest key={tenant.applicationId} tenant={tenant} />
        ))}
      </Grid>
    </>
  );
}
