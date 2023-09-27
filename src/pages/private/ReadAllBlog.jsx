import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../../slice/blog";
import BlogCard from "../../components/BlogCard";
import axios from "axios";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../constants";

export default function ReadAllBlog() {
  const [blogsData, setBlogsData] = useState([]);
  const { allBlogData } = useSelector((store) => store.blogs);
  const dispatch = useDispatch();
  const getData = async (blogId) => {
    // Pass id as a parameter to getData
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      // console.log(response);
      console.log(response.data.blogs);
      setBlogsData(response.data.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllBlog()).then(() => {
      setIsLoading(false);
      setBlogsData(allBlogData);
    });
    console.log(allBlogData);

    // console.log()
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {allBlogData.length === 0 ? (
        <Typography textAlign="center" variant="h3">
          Sorry no blogs found
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {allBlogData.map((blog) => {
            return <BlogCard {...blog} getAll={getData} />;
          })}
        </Grid>
      )}
    </>
  );
}
