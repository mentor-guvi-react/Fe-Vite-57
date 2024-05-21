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

import BookingSlots from "./BookingSlots";
import axios from "axios";

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
  paddingRight: 0,
  paddingTop: 0,
};

const BookingModal = ({ open, handleClose, selectedHotel = "" }) => {
  const [BookingState, setBookingState] = React.useState({
    selectedDate: "",
    selectedSeats: 0,
    selectedSlot: "",
  });

  const username = localStorage.getItem("username");

  const handleDateChange = (date) => {
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;

    setBookingState({
      ...BookingState,
      selectedDate: `${year}-${month}-${day}`,
    });
  };

  const makeBooking = async () => {

    const {
      selectedDate = "",
      selectedSeats = "",
      selectedSlot = "",
    } = BookingState;
    if (
      selectedDate.length &&
      selectedHotel.length &&
      selectedSeats > 0 &&
      selectedSlot.length &&
      username.length
    ) {
      const response = await axios.post("https://fe-node-57.onrender.com/createBooking", {
        selectedHotel,
        username,
        ...BookingState,
      });
      if (response !== "error") {
        handleClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={4}
        >
          <Grid item width={"100%"} style={{ background: "black" }}>
            <Typography variant="h5" textAlign={"center"} color={"white"}>
              Select an Offer or Deal
            </Typography>
          </Grid>

          <Grid item width={"90%"}>
            <Typography textAlign={"center"}>Select Seats</Typography>
            <Slider
              onChange={(e, value) =>
                setBookingState({ ...BookingState, selectedSeats: value })
              }
              valueLabelDisplay="auto"
              defaultValue={0}
              step={1}
              marks
              min={1}
              max={20}
            />
          </Grid>

          <Grid item width={"100%"}>
            <Grid
              container
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography textAlign={"center"}>Select Date</Typography>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                width={"100%"}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      onChange={handleDateChange}
                      disablePast
                      label="Pick Your Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item width={"100%"}>
            <BookingSlots
              BookingState={BookingState}
              setBookingState={setBookingState}
            />
          </Grid>

          <Grid item>
            <Button
              color="info"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={makeBooking}
            >
              Book
            </Button>
            <Button color="error" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BookingModal;
