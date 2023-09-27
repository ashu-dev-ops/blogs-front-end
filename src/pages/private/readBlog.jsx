import { Box, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";

export default function ReadBlog() {
  const [data, setData] = useState(null);
  const { id } = useParams(); // Move this outside of getData

  const getData = async (blogId) => {
    // Pass id as a parameter to getData
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
      // console.log(response);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(id); // Call getData with the id from useParams
  }, [id]); // Include id as a dependency for the useEffect
  const createMarkup = (html) => {
    console.log(html);
    console.log({ __html: html });
    return { __html: html };
  };

  return (
    <div>
      {data ? (
        <Container
          sx={{  marginX: "auto", width: "780px" }}
        >
          {/* <img
            style={{ maxWidth: "680px", margin: "auto" }}
            src={data.heroImage}
          ></img>
          <h1>{data.title}</h1> */}
          <Box
            component="div"
            className="content"
            dangerouslySetInnerHTML={createMarkup(data.html)}
            
          ></Box>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
