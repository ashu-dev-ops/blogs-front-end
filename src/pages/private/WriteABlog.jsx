import React, { useState } from "react";
import Editor from "../../components/Editor";
import { Box, Button } from "@mui/material";
import { saveBlog } from "../../slice/blog";
import { useDispatch } from "react-redux";

export default function WriteABlog() {
  // const [savedText, setSavedText] = useState();
  const edit = false;
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Editor edit={edit} />
      </Box>
    </>
  );
}
