import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Chip,
  CardActions,
  Box,
} from "@mui/material";
import Comment from "./Comment";
import { fDateTime } from "../../utils/formatTime";
import PostFrom from "./PostFrom";

function getColorFromContent(content) {
  const hash = content.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
    (hash >> 16) &
    0xff
  )
    .toString(16)
    .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}${(
    hash & 0xff
  )
    .toString(16)
    .padStart(2, "0")}`;

  return color;
}

const Post = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const words = post.content.split("");

  return (
    <Box>
      <PostFrom />
      <Card sx={{ marginBottom: 2, mt: 2 }}>
        <CardContent sx={{}}>
          <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
            {post.title || ""}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography variant="h6" color="text" gutterBottom>
                Author: {post.ownerName || "Unknown"}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Created at: {fDateTime(post.createdAt) || "Unknown"}
              </Typography>
            </div>
            <div>
              {post.tags &&
                post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    style={{
                      background: getColorFromContent(tag),
                      color: "white",
                      margin: "0.5rem",
                    }}
                  />
                ))}
            </div>
          </Box>
          <p style={{ fontSize: "1rem" }}>
            {showFullContent
              ? post.content || ""
              : words.slice(0, 100).join("") || ""}
            {!showFullContent && words.length > 100 && (
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowFullContent(true)}
              >
                ...show more
              </span>
            )}
            {showFullContent && words.length > 100 && (
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowFullContent(false)}
              >
                . show less
              </span>
            )}
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setShowComments(!showComments)}>
            Comment
          </Button>
          <p style={{ textAlign: "center", marginBottom: "1.3rem" }}>
            <span style={{ display: "inline-block", verticalAlign: "middle" }}>
              {post.comments.length}
            </span>
          </p>
        </CardActions>
        {showComments && (
          <div>
            <Comment comments={post.comments} />
          </div>
        )}
      </Card>
    </Box>
  );
};

export default Post;
