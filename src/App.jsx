import { useState } from "react";

import { Grid } from "@mui/material";
import MyNavBar from "./MyNavBar";
import BookingInformation from "./BookingInformation";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const HomePage = () => (
    <Grid container width={"100%"}>
      <MyNavBar />
      <BookingInformation />
    </Grid>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:location" element={<HomePage />}></Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
