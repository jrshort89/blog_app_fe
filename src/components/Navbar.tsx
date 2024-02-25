import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuDrawer } from "./drawers/MenuDrawer";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
  isAuthenticated: boolean;
}

// TODO: remove inline styles
export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (side: string, isOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen((o) => !o);
    };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <MenuIcon onClick={toggleDrawer("left", !isDrawerOpen)} />
        &nbsp;
        <MenuDrawer isOpen={isDrawerOpen} setIsOpen={toggleDrawer} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            color="white"
            to={"/"}
          >
            Translate
          </Link>
        </Typography>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          color="white"
          to="/settings"
        >
          Settings
        </Link>
      </Toolbar>
    </AppBar>
  );
};
