import { AppContext } from "App/auth/auth";
import React from "react";
import { useContext } from "react";
import SearchBar from "../../SearchBar";
import UserMenu from "../../UserMenu";

const Landing: React.FC = () => {
  const authContext = useContext(AppContext);

  return (
    <>
      <UserMenu />
      {authContext.isLoggedIn && <SearchBar />}
    </>
  );
};

export default Landing;
