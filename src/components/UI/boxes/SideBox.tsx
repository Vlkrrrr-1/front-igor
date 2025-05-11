import { Box, BoxProps } from "@mui/material";
import React from "react";

interface SideBoxProps extends BoxProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SideBox: React.FC<SideBoxProps> = ({ toggleDrawer, ...boxProps }) => {
  return (
    <Box
      {...boxProps}
      sx={{
        width: 280,
        height: "100vh",
        background: "rgb(255, 127, 191)",
        paddingY: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...boxProps.sx,
        color: "black",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {boxProps.children}
    </Box>
  );
};

export default SideBox;
