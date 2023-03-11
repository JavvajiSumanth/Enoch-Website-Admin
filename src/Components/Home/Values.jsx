import React from "react";

import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import MentorImg from "../../assets/pictures/mentor.svg";
import CorporateImg from "../../assets/pictures/corporate.svg";
import TrainingSessionsImg from "../../assets/pictures/training-sessions.svg";
import OnlineTraingImg from "../../assets/pictures/online-training.svg";
import PlacementTrainingImg from "../../assets/pictures/placement.svg";
import InterviewImg from "../../assets/pictures/interview.svg";
const Values = () => {
  return (
    <Box
      sx={{
        margin: "auto",
        my: 10,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        LTB is the best place to learn the best
      </Typography>
      <Typography
        sx={{
          mb: 3,
          textAlign: "center",
          fontSize: "1.15rem",
          mt: 0.5,
        }}
      >
        Best Opportunity To Learn From Currently Working Professionals
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#E3FDFD",
                color: "#35cc57",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={OnlineTraingImg}
                  alt="green iguana"
                  height={"100px"}
                />
                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Online Training
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  Online training program has two types i.e One-One personalized
                  training and Batch wise. Personalised training designed to
                  allow our students to study anytime & any where based on their
                  convenient time. We will assign a dedicated trainer for them
                  to learn in a easy and clear manner Batch wise training is
                  designed to allow our students to learn by joining in a batch
                  wise training program. This will impove the communication and
                  confidence and public speech skills as well.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#FFE2E2",
                color: "#4589c1",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={MentorImg}
                  alt="green iguana"
                  height={"100px"}
                />

                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Mentorship Program
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  Mentorship program is specially designed to get a dedicated
                  personal mentor to help in the training and work. Mentor will
                  help you to resolve the queries then and there. Also, mentor
                  will help to complete the real time tasks in a easy and
                  understandable way. This way helps to achieve the real time
                  work.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#fef2cd",
                color: "#fd7e14",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={CorporateImg}
                  alt="green iguana"
                  height={"100px"}
                />

                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Corporate Trainings
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  LTB Info tech offers the effective and quality corporate
                  training programs that help Organizations to improve the
                  skills and knowledge of their employees. This program allows
                  the employees to utilise the opportunities to build and
                  improve skills.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#B3FFAE",
                color: "#8864c3",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={TrainingSessionsImg}
                  alt="green iguana"
                  height={"100px"}
                />

                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Weekend Training sessions
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  Weekend Training sessions program is designed for the working
                  professionals to improve their skills in their free time. We
                  conduct weekend training classes for those people who are not
                  having enough time on weekdays to learn something new. The
                  students or working professionals can enroll for the weekend
                  classes to spend the quality time by learning more.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#e2e7ff",
                color: "#e25118",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={PlacementTrainingImg}
                  alt="green iguana"
                  height={"100px"}
                />

                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Placement Guidance
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  LTB info tech gives you the right guidance in order to acheive
                  your goals. we helps you get notified the current placements
                  and opportunities which you can attend. Also, we share your
                  profile to the recuiters to get the placement calls. We build
                  strong resumes to get recuiters attention.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: "344px",

                backgroundColor: "#f3d7fb",
                color: "#27ab9b",
              }}
            >
              <CardActionArea
                sx={{
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={InterviewImg}
                  alt="green iguana"
                  height={"100px"}
                />

                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  sx={{
                    mt: 2,
                    // color: "#fff",
                  }}
                >
                  Mock interviews{" "}
                </Typography>
                <Typography variant="body2" className="text-truncate-5">
                  We conduct mock interviews to those who enrolled for the
                  properties. we also provide the pre and post interview support
                  to clear the doubts which you have during the interview which
                  will be helpful to improve the knowledge and skills and to
                  fill the gaps.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Values;
