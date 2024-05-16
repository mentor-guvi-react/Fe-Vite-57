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
import { sortData } from "./Constants";

import { useParams } from "react-router-dom";

export default function BookingInformation() {
  const { location = "Delhi" } = useParams();

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
        <Filter />
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
              Best Restaurants Near Me in {location} (23057)
            </Typography>
          </Grid>

          <Grid item>
            <Grid container alignItems={"center"}>
              <Typography variant="h5">Sort</Typography>
              <FormControl sx={{ m: 1, width: 200 }}>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={sortData[0]}
                  onChange={() => {}}
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
          <BookingCards location={location} />
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
