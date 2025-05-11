import React from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";

const NavigationWrapper = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <LeftMenu toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </>
  );
};

export default NavigationWrapper;
