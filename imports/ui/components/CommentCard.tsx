import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { DateTime } from "luxon";

import { Comment } from "/imports/api/comments";
import { useUserInfo } from "/imports/providers/adventureRoutes";
import { Loading } from "/imports/ui/pages/Loading";

type CommentCardProps = {
  comment: Comment;
};
export const CommentCard = (props: CommentCardProps) => {
  const { comment } = props;

  const { commentText, date } = comment;
  const { data: userInfo, isLoading: isUserDataLoading } = useUserInfo(
    comment.userId
  );
  const { username, profile } = userInfo || {};
  const { profilePictureUrl } = profile || {};

  const formattedDate = DateTime.fromJSDate(date).toFormat(
    "LLLL d, yyyy h:mm:ss a"
  );

  if (isUserDataLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={profilePictureUrl} />
          <Box>
            <Typography variant="h6">{username}</Typography>
            <Typography>{formattedDate}</Typography>
          </Box>
        </Box>
        {commentText}
      </CardContent>
    </Card>
  );
};
