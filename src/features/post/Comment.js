import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { fToNow } from "../../utils/formatTime";

function Comment({ comments }) {
  return (
    <Box sx={{ mt: 0 }}>
      {comments.map((comment, index) => (
        <Box sx={{ m: 2 }} key={index}>
          <Typography variant="body1">
            <strong>
              {comment.ownerName}{" "}
              <Typography variant="body2" component="span">
                Created {fToNow(comment.createdAt)} ago
              </Typography>
            </strong>
          </Typography>
          <Typography variant="body1">{comment.content}</Typography>
          {index < comments.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}

export default Comment;
