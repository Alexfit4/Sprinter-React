import React from "react";

export default function Container({ fluid, children }) {
    return <div className={`container${fluid ? "-fluid" : ""}`} id="container">{children}</div>;
  }