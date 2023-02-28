import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Cancel, Download } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: { xs: "40%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "95vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

export const ImageViewer = (props) => {
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <Modal
      open={props.imageViewer}
      onClose={() => props.setImageViewer(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction={"row"} justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            color={"error"}
            sx={{ borderRadius: "20px" }}
            size={smallScreen ? "small" : "large"}
            onClick={() => props.setImageViewer(false)}
          >
            Cancel
          </Button>
          <Typography
            id="modal-modal-title"
            variant={{ xs: "p", sm: "h6" }}
            margin="auto"
            color="text.secondary"
          >
            Image Viewer
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Download />}
            color={"success"}
            sx={{ borderRadius: "20px" }}
            size={smallScreen ? "small" : "large"}
            component={RouterLink}
            to={props.postData?.imagefield}
            target="_blank"
            download
          >
            Download
          </Button>
        </Stack>

        <Stack direction={"row"} justifyContent="center">
          <Box
            mt={5}
            component={"img"}
            sx={{
              maxHeight: "80vh",
              width: { xs: "98vw", md: "80vw" },
            }}
            alt={props.postData?.content}
            src={props.postData?.imagefield}
          />
        </Stack>
      </Box>
    </Modal>
  );
};
