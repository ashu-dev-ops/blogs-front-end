//@ts-check

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CampaignIcon from "@mui/icons-material/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import { EditNote, MenuOpen, Schedule } from "@mui/icons-material";
import { CircularProgress, Drawer, useMediaQuery } from "@mui/material";
import { customFetch } from "../../utils/axios";
import { PageStyle } from "../../components/PageStyle";
import PublishIcon from "@mui/icons-material/Publish";
import { logoutUser } from "../../slice/user";

const drawerWidth = 240;

export default function NavbarDashBoard() {
  // console.log(loggingOut);
  const currentPath = window.location.href;
  const pathArray = currentPath.split("/");
  let userPostion = 0;
  pathArray.some((pathSting, i) => {
    if (pathSting === "user") {
      userPostion = i;
      return true;
    }
  });
  const currentActivePage = userPostion ? pathArray[userPostion + 1] : "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);
  const [loggingOut, setIsLogginOut] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [activeTab, setActiveTab] = useState(
    currentActivePage === "dashboard" ? "" : currentActivePage
  );
  const isBigScreen = useMediaQuery("(min-width: 900px)");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  function handleNavLinkBtn(path) {
    setActiveTab(path);
    navigate(path);
  }

  function loggingOutFunction() {
    setIsLogginOut(true);

    setTimeout(function () {
      // dispatch(logoutUser());
      dispatch(logoutUser());

      setIsLogginOut(false);
      navigate("/");
    }, 1200);
  }

  useEffect(() => {
    if (isBigScreen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isBigScreen]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {!isBigScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                color: "primary.main",
              }}
            >
              {!isBigScreen ? <MenuIcon /> : <MenuOpen />}
            </IconButton>
          )}
          <Stack
            direction="row"
            spacing={1}
            width="100%"
            display={"flex"}
            justifyContent="center"
            justifyItems={"center"}
            alignItems={"center"}
          >
            {/* <img src={logo} alt="logo big" height="40px" /> */}
            <Typography
              variant="h6"
              color={"primary"}
              align="center"
              justifyContent={"center"}
            >
              Blogs App
            </Typography>
          </Stack>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        anchor={"left"}
        variant={isBigScreen ? "permanent" : "temporary"}
        open={open}
        sx={{
          height: "100%",
          display: "flex",
          width: drawerWidth,
          flexDirection: "column",
          "& .MuiDrawer-paperAnchorDockedLeft, & .css-4t3x6l-MuiPaper-root-MuiDrawer-paper":
            {
              justifyContent: "space-between",
              width: drawerWidth,
            },
        }}
        onClose={() => setOpen(false)}
      >
        <Stack mt={"65px"} width={"100%"}>
          <List>
            <CustomListItem
              Icon={AutoStoriesIcon}
              onClick={() => {
                handleNavLinkBtn("read-all");
              }}
              activeBgColor="#9b70ff33"
              label="All Blogs"
              isActive={activeTab == "read-all"}
            />
            <CustomListItem
              Icon={CreateIcon}
              onClick={() => {
                handleNavLinkBtn("write-blog");
              }}
              activeBgColor="#9b70ff33"
              label="Write a blog"
              isActive={activeTab == "write-blog"}
            />
            <CustomListItem
              Icon={PublishIcon}
              onClick={() => {
                handleNavLinkBtn("published");
              }}
              activeBgColor="#9b70ff33"
              label="Published blogs"
              isActive={activeTab == "published"}
            />
          </List>
        </Stack>

        <List>
          <Divider />

          <CustomListItem
            Icon={LogoutIcon}
            isLoading={loggingOut}
            onClick={loggingOutFunction}
            label={loggingOut ? "Logging out" : "Logout"}
            isActive={false}
          />
        </List>
      </Drawer>
      <PageStyle>
        <Outlet />
      </PageStyle>
    </Box>
  );
}

/**
 * @typedef {import('@mui/material/OverridableComponent').OverridableComponent<import('@mui/material').SvgIconTypeMap<{}, "svg">> & { muiName: string;}} MuiIconType
 */
/**
 *
 * @param {object} props
 * @param {string} props.label
 * @param {boolean} props.isActive
 * @param {() => void} props.onClick
 * @param {string} [props.color]
 * @param {MuiIconType} [props.EndIcon]
 * @param {boolean} [props.isLoading]
 * @param {string} [props.activeBgColor]
 * @param {string} [props.hoverBgColor]
 * @param {MuiIconType} props.Icon
 * @returns
 */
function CustomListItem({
  label,
  isActive,
  onClick,
  color,
  isLoading,
  activeBgColor,
  hoverBgColor,
  EndIcon,
  Icon,
}) {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: "center",
          px: 2.5,
          backgroundColor: isActive
            ? activeBgColor
              ? activeBgColor
              : "rgba(0, 0, 0, 0.04)"
            : " ",
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            mr: 2,
            minWidth: 0,
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{
                color: "GrayText",
              }}
            />
          ) : (
            <Icon
              sx={{
                color: color ? color : isActive ? "primary.main" : "",
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            variant: "body2",
            sx: {
              fontWeight: "500",
              color: color
                ? color
                : isActive
                ? "primary.main"
                : "text.secondary",
            },
          }}
        />
        {EndIcon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
            }}
          >
            <EndIcon
              sx={{
                color: color ? color : isActive ? "primary.main" : "",
              }}
            />
          </ListItemIcon>
        )}
      </ListItemButton>
    </ListItem>
  );
}
