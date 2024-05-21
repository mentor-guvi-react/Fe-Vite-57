import {
  AppBar,
  Grid,
  FormControl,
  OutlinedInput,
  Select,
  Breadcrumbs,
  MenuItem,
  Link,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Filter from "./Filter";
import BookingCards from "./BookingCards";
import { restaurant, sortData } from "./Constants";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

export default function BookingInformation({ seachedHotel }) {
  const { location = "Delhi" } = useParams();

  const hotelCount = restaurant[location?.toLowerCase()]?.length || 0;

  const [filteredTags, setFilteredTags] = useState([]);
  const [sortedType, setSortedType] = useState("Ratings");

  const [apiHotelList, setapiHotelList] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const response = await axios.get(
      "https://fe-node-57.onrender.com/fetchHotels?location=" + location.toLowerCase()
    );
    console.log(response.data, "response ");
    setapiHotelList(response.data);
  };

  const handleTagChange = (event) => {
    const filteredValue = [...filteredTags, event.target.value];
    setFilteredTags(filteredValue);
  };

  const handleSortChange = (event) => {
    console.log(event.target.value);
    setSortedType(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        margin: "auto",
        maxWidth: 2450,
      }}
    >
      <Grid item lg={3}>
        <Filter handleTagChange={handleTagChange} />
      </Grid>
      <Grid item lg={8}>
        {Locationcrumbs(location)}

        <Grid
          container
          // spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography variant="h5">
              Best Restaurants Near Me in {location}
              {" - "}
              {hotelCount ? hotelCount : ""}
            </Typography>
          </Grid>

          <Grid item>
            <Grid container alignItems={"center"}>
              <Typography variant="h5">Sort</Typography>
              <FormControl sx={{ m: 1, width: 200 }}>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={sortedType}
                  onChange={handleSortChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {sortData.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      //   style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <BookingCards
            filteredTags={filteredTags}
            location={location}
            seachedHotel={seachedHotel}
            sortedType={sortedType}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Locationcrumbs = (location) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
      {location}
    </Link>,
    <Typography key="3" color="text.primary">
      {location} Restaurents
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

// master obj -> many locations -> each location has many hotels -> hotel details
