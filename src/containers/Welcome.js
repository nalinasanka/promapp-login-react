import React, { Component } from "react";
import "./Welcome.css";

export default class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className="lander">
          <h1>Welcome to Promapp</h1>
          <h2>User logged in</h2>
        </div>
      </div>
    );
  }
}
