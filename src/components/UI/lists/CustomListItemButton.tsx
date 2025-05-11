import React from "react";
import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface CustomListItemButtonProps extends ListItemButtonProps {
  to: string;
}

const CustomListItemButton: React.FC<CustomListItemButtonProps> = ({
  to,
  children,
  ...rest
}) => {
  return (
    <ListItemButton
      component={Link}
      to={to}
      sx={{
        borderRadius: 2,
        marginX: 2,
        marginY: 1,
        paddingY: 1.5,
        color: "white",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgb(253, 242, 240)",
          transform: "scale(1.03)",
        },
      }}
      {...rest}
    >
      {children}
    </ListItemButton>
  );
};

export default CustomListItemButton;
