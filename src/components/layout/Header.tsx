import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import HeaderButton from "../UI/buttons/HeaderButton";
import { Link, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

interface HeaderProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [variant, setVariant] = useState(false);
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgb(255, 127, 191)",
        color: "black",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
                color: "rgb(166, 166, 246)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
              fontSize: { md: "1.5rem", xs: "1rem" },
              color: "rgb(30, 30, 47)",
            }}
          >
            HStory
          </Typography>
        </Link>
        <Box sx={{ display: "flex", gap: 1, marginLeft: "auto" }}>
          {localStorage.getItem("token") ? (
            <>
              <Typography>{localStorage.getItem("username")}</Typography>
            </>
          ) : (
            <>
              <HeaderButton onClick={() => navigate("/login")}>
                Авторизація
              </HeaderButton>
              <HeaderButton onClick={() => navigate("/registration")}>
                Реєстрація
              </HeaderButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
