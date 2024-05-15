import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import { quickFilter, tagsFilter, cuisniesFilter } from "./Constants";

const Filter = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Quick Filters
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {quickFilter.map((ele, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox />}
                  label={ele}
                ></FormControlLabel>
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Cuisines
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {cuisniesFilter.map((ele, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox />}
                  label={ele}
                ></FormControlLabel>
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Tags
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {tagsFilter.map((ele, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox />}
                  label={ele}
                ></FormControlLabel>
              );
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Filter;
