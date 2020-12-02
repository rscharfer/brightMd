import * as React from "react";

import { NavBar } from "./NavBar";
import { Switch } from "./Toggle";

import { HoursOfOperationProvider } from "../hoursOfOperationContext";

import {
  useHoursOfOperationContext,
  useHoursOfDispatch,
  MODES,
} from "../hoursOfOperationContext";

import { TIMES, DAYS } from "../constants";

export function Day({ dayOfWeek, mode }) {
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

function HoursOfOperation() {
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


export function WrappedHoursOfOperation(){
  return <HoursOfOperationProvider>
    <HoursOfOperation/>
  </HoursOfOperationProvider>
}
