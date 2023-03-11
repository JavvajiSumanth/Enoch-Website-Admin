import React from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";
const Training = () => {
  return (
    <Box
      sx={{
        margin: "auto",
        my: 10,
        width: "80%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        Training Features
      </Typography>
      <Typography
        sx={{
          mb: 3,
          textAlign: "center",
          fontSize: "1.15rem",
          mt: 0.5,
        }}
      >
        We've got the best training
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={2} className="training-item">
              <span className="icon feature_box_col_one">
                <img
                  loading="lazy"
                  data-src="https://www.ashokitech.com/assets/frontend/images/training1.png"
                  alt="classroom-training"
                  className="center serviceImg lazyloaded"
                  loading="lazy"
                  src="https://www.ashokitech.com/assets/frontend/images/training1.png"
                />
              </span>
              <div className="box">
                <Typography variant="h3">
                  In-time Property Completion
                </Typography>
                <Typography className="training-info">
                  Our properties are strategically and innovatively designed,
                  blending both theoretical and practical teaching methods. The
                  modules are carefully chosen to ensure the property is as
                  industry-relevant as possible. The properties are concise yet
                  thorough and students can kick start their careers at the
                  earliest possible.
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={2} className="training-item">
              <span className="icon feature_box_col_two">
                <img
                  loading="lazy"
                  data-src="https://www.ashokitech.com/assets/frontend/images/training2.png"
                  alt="classroom-training"
                  className="center serviceImg lazyloaded"
                  loading="lazy"
                  src="https://www.ashokitech.com/assets/frontend/images/training2.png"
                />
              </span>
              <div className="box">
                <Typography variant="h3">
                  State-of-the-art infrastructure
                </Typography>
                <Typography className="training-info">
                  At LTB infotech IT Students study in a learning environment
                  supported by state-of-the-art infrastructure, new and
                  innovative teaching techniques, and high-end technological
                  educational resources.
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={2} className="training-item">
              <span className="icon feature_box_col_three">
                <img
                  loading="lazy"
                  data-src="https://www.ashokitech.com/assets/frontend/images/training3.png"
                  alt="classroom-training"
                  className="center serviceImg lazyloaded"
                  loading="lazy"
                  src="https://www.ashokitech.com/assets/frontend/images/training3.png"
                />
              </span>
              <div className="box">
                <Typography variant="h3">Blended Training Approach</Typography>
                <Typography className="training-info">
                  We adopt an integrated approach to training that helps our
                  students get both the IT knowledge and skills required to
                  handle the challenging corporate responsibilities. Theoretical
                  learning at LTB infotech IT is adequately complemented by
                  practice-based heuristic learning that allows our students to
                  learn in an industry-specific way.
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={2} className="training-item">
              <span className="icon feature_box_col_four">
                <img
                  loading="lazy"
                  data-src="https://www.ashokitech.com/assets/frontend/images/training4.png"
                  alt="conference"
                  className="center serviceImg lazyloaded"
                  loading="lazy"
                  src="https://www.ashokitech.com/assets/frontend/images/training4.png"
                />
              </span>
              <div className="box">
                <Typography variant="h3">Free Demo Sessions</Typography>
                <Typography className="training-info">
                  We also provide our prospective students with the option to
                  try the various programs and properties that we offer through
                  our free demo service. Using this service students can test
                  the property quality and get a better understanding of what
                  property they want to study.
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Training;
