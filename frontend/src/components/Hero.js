import React from "react";

import logo from "../assets/sachin-logo.png";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />

    <p className="lead">
      Login to view dashboard
    </p>
  </div>
);

export default Hero;
