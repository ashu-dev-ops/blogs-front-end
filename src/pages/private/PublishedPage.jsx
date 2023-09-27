import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublishedBlogs } from "../../slice/blog";
import BlogCard from "../../components/BlogCard";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Loader from "../../components/Loader";

export default function PublishedPage() {
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
      {publishedBlogs.length === 0 ? (
        <Typography textAlign="center" variant="h3">
          Sorry no published blogs
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {publishedBlogs.map((blog) => {
            return <BlogCard {...blog} />;
          })}
        </Grid>
      )}
    </>
  );
}
