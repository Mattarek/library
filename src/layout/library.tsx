import { useState } from "react";
import {Box, Toolbar, List, CssBaseline, Typography, IconButton,ListItem,ListItemButton,ListItemIcon,ListItemText } from "@mui/material/";

import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReviewsIcon from "@mui/icons-material/Reviews";

import { Outlet, useLocation } from "react-router-dom";
import { Drawer } from "../components/Drawer/Drawer";
import { DrawerHeader } from "../components/DrawerHeader/DrawerHeader";
import { AppBar } from "../components/AppBar/AppBar";
import { StyledNavLink } from "../components/NavLink/NavLink";

const menuItems = ["books", "reviews"]

export function LibraryLayout() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"Books" | "Reviews">("Books");
  const {pathname} = useLocation();
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pathname.slice(1).split('/').shift().replace(/^./, char => char.toUpperCase())  }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <List>
          {menuItems.map((text, index) => (
            <StyledNavLink
              key={text}
              to={`/${text}`}
              onClick={() => {
                setTab(tab === "Books" ? "Reviews" : "Books");
              }}
            >
              <ListItem disablePadding sx={{ display: "block",  }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    'a li .MuiListItemButton-root': {
                      borderLeft: '3px solid red'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <LibraryBooksIcon /> : <ReviewsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </StyledNavLink>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
