import { Box, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";
function MainLayout() {
  return (
    <Stack>
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
