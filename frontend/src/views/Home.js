import React, { Fragment } from "react";
import { useAuth0 } from "./../react-auth0-spa";

import Hero from "../components/Hero";
import DashBoard from "../components/DashBoard";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
      <Fragment>
        <Hero />
        <hr />
      </Fragment>)}
      {isAuthenticated && (
        <DashBoard isAuthenticated = {isAuthenticated} />
      )}      
    </div>
  );
};

export default Home;
