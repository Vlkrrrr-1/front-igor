import React from "react";
import MainComp from "../components/mainComponents/MainComp";
import NavigationWrapper from "../components/layout/NavigationWrapper";

const MainPage = () => {
  return (
    <div>
      <NavigationWrapper />
      <MainComp />
    </div>
  );
};

export default MainPage;
