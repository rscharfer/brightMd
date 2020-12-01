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
  return (
    <div className="wrapper">
      <h1>{mode}</h1>
      <div className="headerWrapper">
        <header>
          <h1>Hours of operation</h1>
          <p>
            Manage standard hours of operation when providers are able to
            provide care. Patients will be informed if they submit an exam
            outside of these hours.
          </p>
        </header>
        <div>
          {mode === "edit" ? (
            <>
              <button className="cancelButton" onClick={() => setMode("view")}>
                Cancel
              </button>
              <button className="saveButton" onClick={saveHandler}>
                Save
              </button>
            </>
          ) : (
            <button onClick={() => setMode("edit")}>Edit</button>
          )}
        </div>
      </div>
      <section>
        {Object.values(DAYS).map((day) => (
          <Day key={day} dayOfWeek={day} mode={mode} />
        ))}
      </section>
    </div>
  );
}

function WrappedApp(props) {
  return (
    <>
      <HoursOfOperationProvider>
        <App />
      </HoursOfOperationProvider>
    </>
  );
}

export default WrappedApp;
