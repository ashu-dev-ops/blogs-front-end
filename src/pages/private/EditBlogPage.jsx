import React, { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditBlogPage() {
  const { id } = useParams(); // Move this outside of getData

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Editor edit={true} data={id} />
      </Box>
    </>
  );
}
