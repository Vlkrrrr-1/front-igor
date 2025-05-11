import { Button, ButtonProps } from "@mui/material";
import React from "react";

const HeaderButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        backgroundColor: "rgb(255, 255, 255)",
        fontSize: {
          xs: "0.7rem",
          sm: "0.75rem",
          md: "0.875rem",
        },
        padding: { xs: "4px 10px", md: "5px 14px" },
        color: "rgb(0, 0, 0)",
        "&:hover": {
          backgroundColor: "rgb(0, 98, 255)",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export default HeaderButton;
