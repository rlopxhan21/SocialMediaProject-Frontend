import {
  Alert,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";

const RecentActivities = (props) => {
  if (props.error) {
    return (
      <Alert severity="error">
        Error! Request failed with status code 404. Please refresh to try
        loading again.
      </Alert>
    );
  }
  return (
    <ListItem
      alignItems="flex-start"
      component={props.postID ? RouterLink : ""}
      to={props.postID && `/post/${props.postID}`}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.authorImage}>
            {props.name[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem" }}
              color={"text.primary"}
            >
              {props.name}
            </Typography>
          }
          secondary={
            <React.Fragment>
              {props.imageData && (
                <Box
                  component="img"
                  src={props.imageData}
                  sx={{
                    width: 200,
                  }}
                ></Box>
              )}
              <Typography>{props.content}</Typography>
              <Typography>
                {moment(new Date(props.updated)).fromNow()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default RecentActivities;
