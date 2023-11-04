import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {}
  };
  const handleUser = async () => {
    navigate(`/user/${user._id}`);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Blogs{" "}
          </Link>
        </Typography>

        <Button color="inherit" onClick={handleUser}>
          {user.name}
        </Button>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
