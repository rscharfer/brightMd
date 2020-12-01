// import { render, screen } from "@testing-library/react";
// import App from "./App";
import { reducer, createInitState } from "./hoursOfOperationContext";

describe("hours of operation reducer", () => {
  test("on SAVE, the edit state becomes the view state", () => {
    const editState = {
      ...createInitState().edit,
      monday: {
        open: false,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
    };
    const newState = reducer(createInitState({ edit: editState }), {
      type: "SAVE",
    });
    expect(newState.view.monday).toStrictEqual({
      open: false,
      startTime: "9:00 AM",
      closeTime: "5:00 PM",
    });
  });
});
