import React from "react";

import { Fab, Tooltip } from "@mui/material";
import { DarkMode, KeyboardArrowUp } from "@mui/icons-material";

export const DarkNScrollUp = (props) => {
  return (
    <React.Fragment>
      <Tooltip title="Change mode" placement="top">
        <Fab
          color="primary"
          aria-label="darklight-mode"
          size="medium"
          sx={{
            position: "fixed",
            bottom: "8rem",
            right: "1rem",
          }}
          onClick={() => {
            props.setMode(props.mode === "light" ? "dark" : "light");
          }}
        >
          <DarkMode />
        </Fab>
      </Tooltip>

      <Tooltip title="Scroll to top" placement="top">
        <Fab
          color="primary"
          aria-label="scroll-to-top"
          size="medium"
          sx={{
            position: "fixed",
            bottom: "4rem",
            right: "1rem",
          }}
          component="a"
          href="#home"
        >
          <KeyboardArrowUp />
        </Fab>
      </Tooltip>
    </React.Fragment>
  );
};
