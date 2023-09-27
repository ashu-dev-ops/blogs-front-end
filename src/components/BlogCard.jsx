import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Stack,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { useDispatch } from "react-redux";
import { getAllBlog, getAllPublishedBlogs } from "../slice/blog";
import { BASE_URL } from "../constants";

export default function BlogCard({
  html,
  heroImage,
  title,
  _id,
  getData,
  writtenBy,
  published,
  hideBtnactions,
}) {
  const dispatch = useDispatch();
  console.log(getData);
  const navigate = useNavigate();
  const createMarkup = (html) => {
    console.log(html);
    console.log({ __html: html });
    return { __html: html };
  };
  const handleDelete = async (blogId) => {
    console.log("running");
    await axios
      .delete(`${BASE_URL}/blogs/${blogId}`)
      .then((data) => {
        console.log(data);
        // getData();
        dispatch(getAllBlog());
      })
      .catch((err) => console.log(err));
  };
  const handlePublish = async (blogId) => {
    try {
      if (published) {
        await axios.patch(`${BASE_URL}/blogs/${blogId}`, {
          published: false,
        });
        dispatch(getAllPublishedBlogs());
      } else {
        await axios.patch(`${BASE_URL}/blogs/${blogId}`, {
          published: true,
        });
        dispatch(getAllPublishedBlogs());
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getAllBlog());
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345, borderRadius: "17px" }}>
        <CardMedia
          sx={{ height: 190 }}
          image={heroImage}
          title="green iguana"
        />
        <CardContent sx={{ maxHeight: 300, overflow: "hidden", paddingY: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            marginBottom={1}
            marginTop={1}
          >
            {!hideBtnactions ? (
              <Chip
                label={`${published ? "Published" : "Draft"}`}
                size="small"
              />
            ) : (
              ""
            )}

            <Chip label={`By ${writtenBy.username}`} size="small" />
          </Stack>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "1.2rem", fontWeight: 600 }}
          >
            {title}
          </Typography>
        </CardContent>
       
          <Stack justifyContent="space-between" direction="row" width="100%" >
            {!hideBtnactions ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title="Delete blog">
                  <IconButton onClick={() => handleDelete(_id)}>
                    <DeleteForeverIcon sx={{ color: "tomato" }} size="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit blog">
                  <IconButton
                    aria-label="delete"
                    to={`/user/edit-blog/${_id}`}
                    component={Link}
                  >
                    <CreateIcon
                      sx={{ color: "primary.main" }}
                      size="small"
                      // onClick={() => handleEdit(_id)}
                    />
                  </IconButton>
                </Tooltip>

                {!published ? (
                  <Tooltip title="Publish the blog">
                    <IconButton
                      aria-label="delete"
                      // to={`/user/edit-blog/${_id}`}
                      // component={Link}
                      onClick={() => handlePublish(_id)}
                    >
                      <PublishIcon
                        sx={{ color: "primary.main" }}
                        size="small"
                        // onClick={() => handleEdit(_id)}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Unpublish the blog">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handlePublish(_id)}
                    >
                      <UnpublishedIcon
                        sx={{ color: "primary.main" }}
                        size="small"
                        // onClick={() => handleEdit(_id)}
                      />
                    </IconButton>
                  </Tooltip>
                )}

                {/* <Button size="sm">
                <
                  sx={{ color: "primary.main" }}
                  size="small"
                  onClick={() => handleDelete(_id)}
                />
              </Button> */}
              </Box>
            ) : (
              ""
            )}
            {!hideBtnactions ? (
              <Button component={Link} to={`/user/read/${_id}`} size="small">
                Read
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/${_id}`}
                size="small"
                sx={{ marginLeft: "auto", marginBottom: 1, marginRight:1 }}
              >
                Read
              </Button>
            )}
          </Stack>
     
      </Card>
    </Grid>
  );
}
