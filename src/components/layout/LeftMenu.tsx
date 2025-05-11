import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import SideBox from "../UI/boxes/SideBox";
import CustomBox from "../UI/boxes/CustomBox";
import CustomListItemButton from "../UI/lists/CustomListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface LeftMenuProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isOpen: boolean;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ toggleDrawer, isOpen }) => {
  const items = [
    { text: "Головний екран", icon: <HomeIcon />, link: "/home" },
    { text: "Пошук завдань", icon: <SearchIcon />, link: "/search" },
    { text: "Форум", icon: <SportsKabaddiIcon />, link: "/forum" },
    {
      text: "Створення власних завдань",
      icon: <GroupsIcon />,
      link: "/createTask",
    },
    { text: "Власний аккаунт", icon: <EmojiEventsIcon />, link: "/account" },
  ];

  const list = (
    <SideBox toggleDrawer={toggleDrawer}>
      <CustomBox>HStory</CustomBox>
      <List>
        {items.map(({ text, icon, link }) => (
          <ListItem key={text} disablePadding>
            <CustomListItemButton to={link}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  padding: "8px 12px",
                }}
              >
                <ListItemIcon sx={{ color: "#bbb", minWidth: "unset" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: "black",
                    },
                  }}
                />
              </Box>
            </CustomListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBox>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      {list}
    </Drawer>
  );
};

export default LeftMenu;
