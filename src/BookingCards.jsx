import {
  AppBar,
  Grid,
  FormControl,
  OutlinedInput,
  Select,
  Breadcrumbs,
  MenuItem,
  Link,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { restaurant } from "./Constants";
import BookingModal from "./BookingModal";
import { useState } from "react";

const BookingCards = ({ location }) => {
  const [open, setOpen] = useState(false);
  const [selectedHotel, setselectedHotel] = useState("");

  const searchedLocation = location.toLowerCase();

  const handleCardClick = (id) => {
    setOpen(true);
    setselectedHotel(id);
  };

  //   const obj = { a: {} };
  //   console.log(obj?.a?.b?.c, "obj.a.b.c");

  return (
    <>
      <Grid container spacing={4}>
        {restaurant[searchedLocation]?.map((hotelDetail) => {
          return (
            <Grid
              onClick={() => handleCardClick(hotelDetail.id)}
              item
              key={Math.random()}
            >
              <Card style={{ cursor: "pointer" }} sx={{ maxWidth: 325 }}>
                <div style={{ position: "relative" }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={hotelDetail.image}
                    title="green iguana"
                  />

                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 16,
                      color: "white",
                      width: 25,
                      textAlign: "center",
                      height: 20,
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: `rgba(192, 226, 21, 0.93)`,
                    }}
                  >
                    {hotelDetail.ratings}
                  </div>
                </div>

                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {hotelDetail.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotelDetail.location}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {hotelDetail.priceDetail} | {hotelDetail.tags.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        <BookingModal
          selectedHotel={selectedHotel}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      </Grid>

      {/* <div
        style={{
          backgroundColor: "rgba(192, 226, 21, 0.93)",
          height: 500,
          width: 500,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(192, 226, 255, 0.93)",
            height: 400,
            width: 400,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        ></div>
      </div> */}
    </>
  );
};

// const hotelObject = {
//   name: "Hotel Name",
//   address: "Hotel address",
//   price: "₹ 2,000 for 2 (approx)",
//   tags: ["North Indian", "South Indian", "Chinese", "Italian"],
//   rating: 5.5,
//   image:
//     "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/v/f/p31393-171569505266436dcc88e82.jpg?tr=tr:n-medium",
// };

// const delhi = [hotelObject, hotelObject, hotelObject, hotelObject];

// const restaurentDetails = {
//   delhi: [
//     {
//       name: "Hotel Name",
//       address: "Hotel address",
//       price: "₹ 2,000 for 2 (approx)",
//       tags: ["North Indian", "South Indian", "Chinese", "Italian"],
//       rating: 5.5,
//       image:
//         "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/v/f/p31393-171569505266436dcc88e82.jpg?tr=tr:n-medium",
//     },
//   ],
//   chennai: [
//     {
//       name: "Hotel Name",
//       address: "Hotel address",
//       price: "₹ 2,000 for 2 (approx)",
//       tags: ["North Indian", "South Indian", "Chinese", "Italian"],
//       rating: 5.5,
//       image:
//         "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/v/f/p31393-171569505266436dcc88e82.jpg?tr=tr:n-medium",
//     },
//   ],
//   mumbai: [
//     {
//       name: "Hotel Name",
//       address: "Hotel address",
//       price: "₹ 2,000 for 2 (approx)",
//       tags: ["North Indian", "South Indian", "Chinese", "Italian"],
//       rating: 5.5,
//       image:
//         "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/v/f/p31393-171569505266436dcc88e82.jpg?tr=tr:n-medium",
//     },
//   ],
// };

export default BookingCards;
