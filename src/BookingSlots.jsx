import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BookingSlots({ setBookingState, BookingState }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Morning" {...a11yProps(0)} />
          <Tab label="After Noon" {...a11yProps(1)} />
          <Tab label="Dinner" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {slots.morning.map((ele) => {
            return (
              <Grid item key={ele.time}>
                <Chip
                  color={
                    BookingState.selectedSlot === ele.time
                      ? "success"
                      : "default"
                  }
                  onClick={() => {
                    setBookingState({
                      ...BookingState,
                      selectedSlot: ele.time,
                    });
                  }}
                  clickable
                  label={ele.time}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {slots.afternoon.map((ele) => {
            return (
              <Grid item key={ele.time}>
                <Chip
                  color={
                    BookingState.selectedSlot === ele.time
                      ? "success"
                      : "default"
                  }
                  onClick={() => {
                    setBookingState({
                      ...BookingState,
                      selectedSlot: ele.time,
                    });
                  }}
                  clickable
                  label={ele.time}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {slots.dinner.map((ele) => {
            return (
              <Grid item key={ele.time}>
                <Chip
                  color={
                    BookingState.selectedSlot === ele.time
                      ? "success"
                      : "default"
                  }
                  onClick={() => {
                    setBookingState({
                      ...BookingState,
                      selectedSlot: ele.time,
                    });
                  }}
                  clickable
                  label={ele.time}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

const slots = {
  morning: [{ time: "8:00 AM - 9:00 AM" }, { time: "9:00 AM - 10:00 AM" }],
  afternoon: [{ time: "12:00 PM - 1:00 PM" }, { time: "1:00 PM - 2:00 PM" }],
  dinner: [
    { time: "7:00 PM - 8:00 PM" },
    { time: "8:00 PM - 9:00 PM" },
    { time: "9:00 PM - 10:00 PM" },
    { time: "10:00 PM - 11:00 PM" },
  ],
};
