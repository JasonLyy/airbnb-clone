import React from "react";
import SearchBar from "../../SearchBar";
import UserMenu from "../../UserMenu";

const Landing: React.FC = () => {
  return (
    <>
      <UserMenu />
      <SearchBar />
    </>
  );
};

export default Landing;
