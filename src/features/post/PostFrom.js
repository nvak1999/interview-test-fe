import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { postNew, getPost } from "./postSlice";

function PostForm() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    owner: user._id,
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (e) => {
    const { name, checked } = e.target;
    const tags = formData.tags.slice();

    if (checked) {
      tags.push(name);
    } else {
      const index = tags.indexOf(name);
      if (index !== -1) {
        tags.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      tags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postNew(formData));
    await dispatch(getPost());
  };

  // Array of tags

  const tagsArray = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  return (
    <div>
      <Button
        variant="outline"
        color="primary"
        fullWidth
        onClick={() => setShowForm(!showForm)}
        sx={{ mt: 2, mb: 1 }}
      >
        Create a New Post
      </Button>
      {showForm && (
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Content"
                name="content"
                fullWidth
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={formData.content}
                onChange={handleInputChange}
                required
              />
              <FormGroup row>
                {tagsArray.map((tag, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        name={tag}
                        checked={formData.tags.includes(tag)}
                        onChange={handleTagChange}
                      />
                    }
                    label={`${tag}`}
                  />
                ))}
              </FormGroup>
              <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" color="primary">
                  Post
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PostForm;
