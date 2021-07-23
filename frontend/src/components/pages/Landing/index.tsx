import React from "react";
import { AppContext } from "App/auth/auth";
import Header from "App/components/shared/Header";
import { useContext } from "react";
import SearchBar from "../../shared/SearchBar";
import UserMenu from "../../UserMenu";

const Landing: React.FC = () => {
  const authContext = useContext(AppContext);

  return (
    <>
      <UserMenu />
      {authContext.isLoggedIn && <SearchBar />}
      <Header />
    </>
  );
};

export default Landing;
