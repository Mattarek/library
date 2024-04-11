import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState("10%");

  const handleToggleMenu = () => {
    setMenuWidth((prevWidth) => (prevWidth === "10%" ? "20%" : "10%"));
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Ustawia szerokość menu na początku na 10%
    setMenuWidth("10%");
  }, []);

  return (
    <>
      <IconButton
        onClick={handleToggleMenu}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10%",
          transition: "width 0.3s",
          zIndex: 999,
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
        onClose={handleToggleMenu}
      >
        <List>
          <ListItem
            component={NavLink}
            to="/books"
            onClick={() => setIsOpen(false)}
          >
            <ListItemText primary="Książki" />
          </ListItem>
          <ListItem
            component={NavLink}
            to="/reviews"
            onClick={() => setIsOpen(false)}
          >
            <ListItemText primary="Komentarze" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
