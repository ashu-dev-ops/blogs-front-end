import React, { useDebugValue, useEffect, useState } from "react";
import { getAllBlog, getAllPublishedBlogs } from "../../../slice/blog";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import BlogCard from "../../../components/BlogCard";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function AllPublishedBlogs() {
  const dispatch = useDispatch();
  const { publishedBlogs } = useSelector((store) => store.blogs);
  //   const isLoading = true;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllPublishedBlogs()).then(() => {
      setIsLoading(false);
    });
    console.log("below");
    console.log(publishedBlogs);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Container sx={{ marginTop: 5 }}>
        {publishedBlogs.length === 0 ? (
          <Typography textAlign="center" variant="h3">
            Sorry no blogs found 😅
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {publishedBlogs.map((blog) => {
              return <BlogCard {...blog} hideBtnactions={true} />;
            })}
          </Grid>
        )}
      </Container>
    </>
  );
}
