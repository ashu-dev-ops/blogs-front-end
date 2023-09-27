import { CircularProgress, Container } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <CircularProgress sx={{ fontSize: "8rem" }} />
    </Container>
  );
}
