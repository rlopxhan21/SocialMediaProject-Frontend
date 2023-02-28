import React from "react";
import { createTheme } from "@mui/material";

export const useTheme = () => {
  const [mode, setMode] = React.useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    components: {
      MuiBadge: {
        styleOverrides: {
          badge: {
            padding: "0",
          },
        },
      },
    },
  });

  return { mode, setMode, theme };
};
