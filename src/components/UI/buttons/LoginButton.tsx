import { Button, ButtonProps } from "@mui/material";
import React from "react";

const LoginButton = (props: ButtonProps) => {
  return (
    <Button
      sx={{
        background: "black",
        color: "#fff",
        width: "100%",
        fontSize: "25px",
        ...props.sx,
      }}
      {...props}
    ></Button>
  );
};

export default LoginButton;
