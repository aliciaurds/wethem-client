import React from "react";
import { Link } from "react-router-dom";

function Account() {
  return (
    <div>
 
      <p>Orders</p>
      <Link to={"/profile"}>Personal Information</Link>
    </div>
  );
}

export default Account;
