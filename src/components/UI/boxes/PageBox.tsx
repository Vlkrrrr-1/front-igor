import { Box, BoxProps } from "@mui/material";
import React from "react";

const PageBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(253, 242, 240)",
        padding: "40px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default PageBox;
