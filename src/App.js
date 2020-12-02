import "./App.css";

import * as React from "react";

import { WrappedHoursOfOperation } from "./components/HoursOfOperation";
import { Branding } from "./components/Branding";

function WrappedApp(props) {
  return (
    <>
      <WrappedHoursOfOperation />
      <hr />
      <Branding />
    </>
  );
}

export default WrappedApp;
