import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";

type RouteDirectionLegProps = {
  legKey: number;
  leg: google.maps.DirectionsLeg;
};
export const RouteDirectionLeg = (props: RouteDirectionLegProps) => {
  const { leg, legKey } = props;
  const stepBeginningLabel = String.fromCharCode(legKey + 65);
  const stepEndLabel = legKey === 25 ? "AA" : String.fromCharCode(legKey + 66);
  return (
    <Accordion>
      <AccordionSummary sx={{ fontWeight: "bold" }}>
        {stepBeginningLabel} to {stepEndLabel}
      </AccordionSummary>
      <AccordionDetails>
        {leg.steps?.map((step, i) => (
          <Box key={i} display="flex">
            {i + 1}.{" "}
            <div
              key={i}
              dangerouslySetInnerHTML={{
                __html: step.instructions,
              }}
            />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
