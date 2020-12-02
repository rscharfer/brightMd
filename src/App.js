import "./App.css";
import { Switch } from "./Toggle";
import * as React from "react";
import {
  HoursOfOperationProvider,
  useHoursOfOperationContext,
  useHoursOfDispatch,
  MODES,
} from "./hoursOfOperationContext";

const TIMES = {};

function fillTimes() {
  for (let i = 1; i < 12; i++) {
    TIMES[`${i}AM`] = `${i}:00 AM`;
  }
  TIMES[`12PM`] = `12:00 PM`;

  for (let i = 1; i < 12; i++) {
    TIMES[`${i}PM`] = `${i}:00 PM`;
  }
  TIMES[`12AM`] = `12:00 AM`;
}
fillTimes();

const DAYS = {
  SUNDAY: "sunday",
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
};

function NavBar({
  mode,
  title,
  subtitle,
  saveHandler,
  cancelHandler,
  editHandler,
}) {
  return (
    <div className="headerWrapper">
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      <div>
        {mode === "edit" ? (
          <>
            <button className="cancelButton" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="saveButton" onClick={saveHandler}>
              Save
            </button>
          </>
        ) : (
          <button onClick={editHandler}>Edit</button>
        )}
      </div>
    </div>
  );
}

function Day({ dayOfWeek, mode }) {
  const { open, startTime, closeTime } = useHoursOfOperationContext(
    dayOfWeek,
    mode
  );

  const dispatch = useHoursOfDispatch();

  function openCloseHandler() {
    dispatch({
      type: "CHANGE_OPEN_CLOSE",
      day: dayOfWeek,
      value: open ? false : true,
    });
  }

  return (
    <div className="row">
      <div className="day">{dayOfWeek}</div>
      <div className="openOrClosed">
        {mode === MODES.EDIT ? (
          <>
            <Switch on={open} onClick={openCloseHandler} />
            <span>{open ? "OPEN" : "CLOSED"}</span>
          </>
        ) : (
          <span>{open ? "OPEN" : "CLOSED"}</span>
        )}
      </div>
      {mode === MODES.EDIT ? (
        <select
          className="startTime"
          value={startTime}
          onChange={(event) =>
            dispatch({
              type: "CHANGE_OPEN_HOURS",
              day: dayOfWeek,
              value: event.target.value,
            })
          }
        >
          {Object.values(TIMES).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      ) : (
        <span className="startTimeView">{startTime}</span>
      )}

      {mode === MODES.EDIT ? (
        <select
          className="endTime"
          value={closeTime}
          onChange={(event) =>
            dispatch({
              type: "CHANGE_CLOSE_HOURS",
              day: dayOfWeek,
              value: event.target.value,
            })
          }
        >
          {Object.values(TIMES).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      ) : (
        <span className="endTimeView">{closeTime}</span>
      )}
    </div>
  );
}

function App() {
  const [mode, setMode] = React.useState("view");
  const dispatch = useHoursOfDispatch();

  function saveHandler() {
    dispatch({ type: "SAVE" });
    setMode("view");
  }

  const cancelHandler = () => setMode("view");
  const editHandler = () => setMode("edit");
  return (
    <div className="wrapper">
      <h1>{mode}</h1>
      <NavBar
        mode={mode}
        title="Hours of operation"
        subtitle="Manage standard hours of operation when providers are able to
            provide care. Patients will be informed if they submit an exam
            outside of these hours."
        saveHandler={saveHandler}
        cancelHandler={cancelHandler}
        editHandler={editHandler}
      />

      <section>
        {Object.values(DAYS).map((day) => (
          <Day key={day} dayOfWeek={day} mode={mode} />
        ))}
      </section>
    </div>
  );
}

function Branding(props) {
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
          <div className="brandRow">
            <label className="inputLabelView">Full Name</label>
            <input
              className="inputValueEditView"
              name="fullName"
              value={editState.fullName}
              onChange={changeHandler("fullName")}
            />
          </div>
          <div className="brandRow">
            <label className="inputLabelView">Short Name</label>
            <input
              className="inputValueEditView"
              name="shortName"
              value={editState.shortName}
              onChange={changeHandler("shortName")}
            />
          </div>
          <div className="brandRow">
            <label className="inputLabelView">Welcome Text</label>
            <input
              className="inputValueEditView"
              name="welcomeText"
              value={editState.welcomeText}
              onChange={changeHandler("welcomeText")}
            />
          </div>
        </>
      )}
    </div>
  );
}

function WrappedApp(props) {
  return (
    <>
      <HoursOfOperationProvider>
        <App />
      </HoursOfOperationProvider>
      <hr/>
      <Branding />
    </>
  );
}

export default WrappedApp;
