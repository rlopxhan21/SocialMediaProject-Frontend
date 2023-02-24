import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  List,
  Tooltip,
  Typography,
} from "@mui/material";

import RecentActivities from "./RecentActivities";
import LatestPhoto from "./LatestPhoto";
import { useGetRequest } from "../../hooks/api";
import moment from "moment";

let filteredOnlineFriend = "";

const RightSidebar = () => {
  const { data: commentData, error } = useGetRequest("feed/comment/");

  const { data: onlineFriend, error: onlineFriendError } = useGetRequest(
    "useraccount/userinfo/"
  );

  React.useEffect(() => {
    if (onlineFriend) {
      filteredOnlineFriend = onlineFriend.filter((item) => {
        const currentTime = moment(new Date());
        const lastLogin = moment(new Date(item.last_login));

        const timeDiff = currentTime.diff(lastLogin, "minutes");

        if (timeDiff < 10) {
          return true;
        } else {
          return false;
        }
      });
    }
  }, [onlineFriend]);

  return (
    <Box
      flex={2}
      p={2}
      flexGrow={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box>
        <Typography variant="h6" fontWeight={200}>
          Online Users
        </Typography>
        {onlineFriendError ? (
          <Alert severity="error">
            Error! Request failed with status code 404. Please refresh to try
            loading again.
          </Alert>
        ) : (
          <AvatarGroup
            max={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            {filteredOnlineFriend &&
              filteredOnlineFriend.map((item) => (
                <Tooltip title={item.first_name + " " + item.last_name}>
                  <Avatar
                    key={item.id}
                    alt={item.first_name}
                    src={item.imagefield}
                    component={RouterLink}
                    to={`/profile/${item.id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.first_name[0]}
                  </Avatar>
                </Tooltip>
              ))}
            {filteredOnlineFriend.length === 0 && (
              <Typography color={"text.disabled"} variant="subtitle1">
                No online users Found!
              </Typography>
            )}
          </AvatarGroup>
        )}

        <Typography variant="h6" fontWeight={200}>
          Latest Photos
        </Typography>
        <LatestPhoto />

        <Typography variant="h6" fontWeight={200}>
          Recent Actvities
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {!error && (
            <Typography color={"text.disabled"} variant="subtitle1">
              No activities Found!
            </Typography>
          )}
          {error ? (
            <Alert severity="error">
              Error! Request failed with status code 404. Please refresh to try
              loading again.
            </Alert>
          ) : (
            commentData &&
            commentData.map((item) => (
              <RecentActivities
                key={item.id}
                name={
                  item.author_of_comment.first_name +
                  " " +
                  item.author_of_comment.last_name
                }
                authorImage={item.author_of_comment.imagefield}
                updated={item.updated}
                created={item.created}
                content={`Commented ${item.content.slice(
                  0,
                  50
                )} at ${item.post_of_comment.content.slice(0, 50)}`}
                postID={item.post_of_comment.id}
              />
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default RightSidebar;
