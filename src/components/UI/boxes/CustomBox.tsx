import { Box, BoxProps } from "@mui/material";
import React from "react";

const CustomBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: "1.4rem",
        marginBottom: 3,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default CustomBox;
