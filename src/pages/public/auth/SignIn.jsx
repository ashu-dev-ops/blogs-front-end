import { Box, Card, TextField, Typography, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../slice/user";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const { user, isLoading, loginError } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username: email, password: password }));
  };
  React.useEffect(() => {
    if (user) {
      navigate("/user/read-all");
    }
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "80vh",
        marginTop: 8,
      }}
    >
      <Card
        sx={{
          width: "360px",
          minHeight: "60vh",
          display: "flex",
          boxShadow: "-24px 24px 72px -8px rgba(145, 158, 171, 0.24);",
          margin: "auto",
        }}
        // elevation={10}
      >
        {/* {needHelp && <NeedHelp setNeedHelp={setNeedHelp} />} */}

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 30,
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            marginTop={2}
            marginBottom={8}
          >
            <Typography variant="h3">Login!</Typography>
            <Box>
              <Box
                sx={{
                  width: "100%",
                  my: 1,
                  backgroundColor: "#f6f7f8",
                  borderRadius: "10px",
                }}
              >
                <TextField
                  label="User"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="filled"
                  InputProps={{
                    style: {
                      backgroundColor: "transparent",
                    },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#919EAB",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  my: 1,
                  backgroundColor: "#f6f7f8",
                  borderRadius: "10px",
                }}
              >
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                  fullWidth
                  type="password"
                  variant="filled"
                  InputProps={{
                    style: {
                      backgroundColor: "transparent",
                    },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#919EAB",
                      marginBottom: "15px",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="large"
                fullWidth
                // disabled={isLoading}
                // startIcon={
                //   isLoading && <CircularProgress size={20} color="inherit" />
                // }
                sx={{
                  color: "white",
                  marginBottom: "10px",
                }}
                type="submit"
              >
                Submit
                {/* {isLoading ? "Loading..." : "Submit"} */}
              </Button>
              <Typography
                variant="body2"
                textAlign="right"
                color="primary.main"
              >
                <Link
                  component={"span"}
                  underline="none"
                  sx={{ cursor: "pointer" }}
                  //   onClick={() => setNeedHelp(true)}
                >
                  Need help?
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
