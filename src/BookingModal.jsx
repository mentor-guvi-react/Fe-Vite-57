import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Slider } from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const BookingModal = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid grey",
    boxShadow: 12,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container direction={"column"}>
          <Grid item>
            <Typography>Select an Offer or Deal</Typography>
          </Grid>

          <Grid item>
            <Typography>Select Seats</Typography>
            <Slider
              valueLabelDisplay="auto"
              defaultValue={0}
              step={1}
              marks
              min={1}
              max={20}
            />
          </Grid>

          <Grid item>
            <Typography>Select Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Basic date picker" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BookingModal;
