import React from "react";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Fab,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Clear, InsertPhoto } from "@mui/icons-material";

export const Comment = () => {
  const [selectedFiles, setSelectedFiles] = React.useState();
  const [preview, setPreview] = React.useState();
  const [errorComment, setErrorComment] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState("");

  React.useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFiles);

    setPreview(objectURL);
  }, [selectedFiles]);

  const onImageChangeHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFiles(undefined);
      return;
    }

    setSelectedFiles(event.target.files[0]);
  };

  const onImageDeleteHandler = () => {
    setSelectedFiles();
    setPreview();
  };

  const onCommentSubmitHandler = (event) => {
    event.preventDefault();

    const content = event.target.comment.value;

    if (content.length === 0) {
      setErrorComment(true);
    } else {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("imagefield", selectedFiles);

      setErrorComment(false);
      setSelectedFiles();
      setPreview();
      setCommentInput("");
    }
  };

  return (
    <Card
      sx={{ marginTop: 4, p: 2 }}
      component="form"
      noValidate
      onSubmit={onCommentSubmitHandler}
    >
      <Stack direction={"row"} alignItems="center" py={1}>
        <IconButton>
          <Avatar
            alt="name"
            sx={{ height: { xs: 30, md: 60 }, width: { xs: 30, md: 60 } }}
            src="ans"
          >
            R
          </Avatar>
        </IconButton>
        <TextField
          id="outlined-textarea"
          name="comment"
          variant="outlined"
          label="Write a comment..."
          placeholder="Write a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          multiline
          fullWidth
          error={errorComment}
        />
      </Stack>
      <Box position={"relative"}>
        {selectedFiles && (
          <Box
            component="img"
            sx={{
              width: 100,
            }}
            src={preview}
          />
        )}
        {selectedFiles && (
          <Fab
            aria-label="delete"
            size="small"
            sx={{
              position: "absolute",
              top: "-7px",
              left: "87px",
              zIndex: 999,
            }}
            onClick={onImageDeleteHandler}
          >
            <Clear />
          </Fab>
        )}
      </Box>
      <ButtonGroup
        fullWidth
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button type="submit">Post</Button>
        <Button sx={{ width: "200px" }} component={"label"}>
          <InsertPhoto />
          <input
            accept="image/"
            name="image"
            type="file"
            onChange={onImageChangeHandler}
            multiple
            hidden
          />
        </Button>
      </ButtonGroup>
    </Card>
  );
};
