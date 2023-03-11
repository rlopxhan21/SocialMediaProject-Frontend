import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useGetPost } from "../../hooks/PostHooks/useGetPost";
import { Error } from "../Layout/Error/Error";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Cancel, Download } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: { xs: "40%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: "90vw" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  paddingBottom: 6,
  overflow: "hidden",
};

let imageData = undefined;

export default function LatestPhoto() {
  const [openImage, setOpenImage] = React.useState({
    status: false,
    postID: null,
  });
  const onImageHandleClose = () =>
    setOpenImage({
      status: false,
      postID: null,
    });

  const { postData, postError, fetchPostData } = useGetPost();

  React.useState(() => {
    fetchPostData();
  }, []);

  if (postError) {
    return <Error />;
  }

  if (postData) {
    imageData = postData?.filter((item) => item.imagefield);
  }

  return (
    <ImageList sx={{ maxWidth: 500, maxHeight: 450 }}>
      {imageData?.length === 0 && (
        <Typography color={"text.disabled"} variant="subtitle1">
          No Image Found in the System!
        </Typography>
      )}
      {imageData &&
        imageData.map((item, i) => (
          <Box key={item.id}>
            <ImageListItem
              id={item.id}
              onClick={() =>
                setOpenImage({ ...openImage, status: true, postID: i })
              }
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <img
                src={`${item.imagefield}?w=248&fit=crop&auto=format`}
                srcSet={`${item.imagefield}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={"Not Found!"}
                loading="lazy"
              />
              <ImageListItemBar
                subtitle={item.author_of_post.username}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
            {/* Image Viewer */}
            <Modal
              open={openImage.status}
              onClose={onImageHandleClose}
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
                    onClick={onImageHandleClose}
                  >
                    Cancel
                  </Button>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    color="text.secondary"
                  >
                    Image Viewer
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    color={"success"}
                    sx={{ borderRadius: "20px" }}
                    component={RouterLink}
                    to={
                      openImage.status
                        ? imageData[openImage.postID].imagefield
                        : ""
                    }
                    target={"_blank"}
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
                      width: { xs: "98vw", md: "80vw" },
                      maxHeight: "85vh",
                    }}
                    alt={
                      openImage.status
                        ? imageData[openImage.postID].imagefield
                        : ""
                    }
                    src={
                      openImage.status
                        ? imageData[openImage.postID].imagefield
                        : ""
                    }
                  />
                </Stack>
              </Box>
            </Modal>
          </Box>
        ))}
    </ImageList>
  );
}
