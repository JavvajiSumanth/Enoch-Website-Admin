import * as React from "react";

import Typography from "@mui/material/Typography";
import { Grid, IconButton, Paper } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Messages() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const fetchedData = [];
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setMessages(fetchedData);
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
        Recently Added Messages
      </Typography>
      <Grid
        container
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {messages.map((re, idx) => (
          <Grid key={idx} item sx={{ my: 2 }} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, m: 2 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  textAlign: "center",
                  mb: 3,
                }}
              >
                {re.name}
              </Typography>{" "}
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  aliginItems: "center",
                  gap: 2,
                }}
              >
                <Email /> {re.email}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  aliginItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Phone /> {re.phone}
              </Typography>
              <Typography variant="body1">{re.description}</Typography>
              <Typography
                variant="caption"
                sx={{
                  textAlign: "right",
                  ml: "auto",
                }}
                component={"p"}
              >
                - {re.date?.toDate().toDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
