import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { Grid, Box, Typography, Button } from "@mui/material";

import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let isLoaded = false;

export default function MyBookingModal({
  openMybookingModal,
  handleMyBookingClose,
}) {
  const username = localStorage.getItem("username");

  const [myBookingData, setmyBookingData] = React.useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMyBooking = async () => {
    const response = await axios.get(
      "https://fe-node-57.onrender.com/mybookings?username=" + username
    );

    if (response.data !== "error") {
      setmyBookingData(response.data);
    }
  };

  React.useEffect(() => {
    if (isLoaded) return;
    fetchMyBooking();
    isLoaded = true;

    return () => {
      isLoaded = false;
    };
  }, [fetchMyBooking]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid grey",
    boxShadow: 12,
    p: 4,
  };

  const handleCancel = async (bookingId) => {
    const response = await axios.post("https://fe-node-57.onrender.com/cancelBooking", {
      bookingId,
    });
    if (response.data === "Cancelled Booking") {
      handleMyBookingClose();
    }
  };

  return (
    <Modal
      open={openMybookingModal}
      onClose={handleMyBookingClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid item paddingBottom={4}>
          <Typography textAlign={"center"} variant="h3">
            Your Booking
          </Typography>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Hotel Name</StyledTableCell>
                <StyledTableCell align="right">Seats</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myBookingData?.map((row) => (
                <StyledTableRow key={row.selectedHotel}>
                  <StyledTableCell component="th" scope="row">
                    {row.selectedHotel}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.selectedSeats}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.selectedDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.selectedSlot}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      color="error"
                      onClick={(e) => handleCancel(row._id)}
                    >
                      Cancel
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
}
