import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { Box, Button, Stack } from "@mui/material";
import { ArrowBack, Download } from "@mui/icons-material";

export const PostImage = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      flex={3}
      flexGrow={3}
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "10px",
        p: 4,
        paddingBottom: 6,
      }}
      display={props.postData?.imagefield ? "block" : "none"}
    >
      <Stack direction={"row"} justifyContent="space-between">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          color={"error"}
          sx={{ borderRadius: "20px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          color={"success"}
          sx={{ borderRadius: "20px" }}
          component={RouterLink}
          to={props.p?.imagefield}
          target={"_blank"}
          download
        >
          Download
        </Button>
      </Stack>
      <Stack justifyContent={"center"}>
        <Box
          margin={"auto"}
          mt={5}
          component={"img"}
          sx={{
            width: { xs: "90vw", xl: "60vw" },
            maxHeight: "85vh",
          }}
          alt={props.postData?.content}
          src={props.postData?.imagefield}
          onClick={() => props.setImageViewer(true)}
        />
      </Stack>
    </Box>
  );
};
