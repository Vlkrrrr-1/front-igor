import { InputProps } from "@mui/material";
import React from "react";

const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      style={{
        borderRadius: "6px",
        border: "1px solid #ccc",
        padding: "8px",
        width: "100%",
        fontSize: "26px",
        ...(props.style || {}),
      }}
    />
  );
};

export default CustomInput;
