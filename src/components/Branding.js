import * as React from "react";
import { NavBar } from "./NavBar";

function ControlledInput({
  labelText,
  htmlFor,
  placeholder = "placeholder text",
  ...props
}) {
  return (
    <div className="brandRow">
      <label htmlFor={htmlFor} className="inputLabelView">
        {labelText}
      </label>
      <input
        placeholder={placeholder}
        id={htmlFor}
        className="inputValueEditView"
        {...props}
      />
    </div>
  );
}

export function Branding(props) {
  const [editState, setEditState] = React.useState({
    fullName: "Bright.md Hospital",
    shortName: "BMD",
    welcomeText: "Get a quick diagnosis for many madication conditions",
  });

  const [viewState, setViewState] = React.useState({
    fullName: "Bright.md Hospital",
    shortName: "BMD",
    welcomeText: "Get a quick diagnosis for many madication conditions",
  });

  const [mode, setMode] = React.useState("edit");

  const editHandler = () => setMode("edit");
  const saveHandler = () => {
    setMode("view");
    setViewState(editState);
  };
  const cancelHandler = () => setMode("view");

  function changeHandler(name) {
    return (e) =>
      setEditState((oldState) => ({ ...oldState, [name]: e.target.value }));
  }

  return (
    <div className="wrapper">
      <NavBar
        mode={mode}
        title="Branding"
        subtitle="Set name, welcome page text and other branding for your patients to see during an exam"
        saveHandler={saveHandler}
        cancelHandler={cancelHandler}
        editHandler={editHandler}
      />
      <h2 className="display">Display Name</h2>
      <p>
        Set how the organization is diplayed to patients. In instances with
        limited screen space (emails, mobile view), a shortened name is
        displayed
      </p>
      {mode === "view" ? (
        <>
          <div className="brandRow">
            <div className="inputLabelView">Full Name</div>
            <div className="inputValueView">{viewState.fullName}</div>
          </div>
          <div className="brandRow">
            <div className="inputLabelView">Short Name</div>
            <div className="inputValueView">{viewState.shortName}</div>
          </div>
          <div className="brandRow">
            <div className="inputLabelView">Welcome Text</div>
            <div className="inputValueView">{viewState.welcomeText}</div>
          </div>
        </>
      ) : (
        <>
          <ControlledInput
            labelText="Full Name"
            htmlFor="fullName"
            value={editState.fullName}
            onChange={changeHandler("fullName")}
          />
          <ControlledInput
            labelText="Short Name"
            htmlFor="shortName"
            value={editState.shortName}
            onChange={changeHandler("shortName")}
          />
          <ControlledInput
            labelText="Welcome Text"
            htmlFor="welcomeText"
            value={editState.welcomeText}
            onChange={changeHandler("welcomeText")}
          />
        </>
      )}
    </div>
  );
}
