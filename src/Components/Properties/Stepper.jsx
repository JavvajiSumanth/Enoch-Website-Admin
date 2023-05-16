import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useRef } from "react";
import { updateReport, deleteReport } from "../../api/api";

const steps = ["Started", "In Progress", "Review"];

export default function HorizontalLinearStepper({ hide, report, setReports }) {
  const [activeStep, setActiveStep] = React.useState(report.status);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      updateReport(report.id, activeStep);
    }
  }, [activeStep]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handelDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this property?") === true
    ) {
      const data = await deleteReport(report.id);
      if (data) {
        setReports((properties) =>
          properties.filter((crs) => crs.id !== report.id)
        );
      }
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
            color="green"
          >
            Maintanance Repair is Completed
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Repair {steps[activeStep]}
          </Typography>
          {!!hide ? null : (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handelDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
