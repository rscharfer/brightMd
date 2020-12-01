import * as React from "react";

export const createInitState = (overrides = {}) => {
  return {
    [MODES.EDIT]: {
      sunday: {
        open: false,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      monday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      tuesday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      wednesday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      thursday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      friday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      saturday: {
        open: false,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
    },
    [MODES.VIEW]: {
      sunday: {
        open: false,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      monday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      tuesday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      wednesday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      thursday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      friday: {
        open: true,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
      saturday: {
        open: false,
        startTime: "9:00 AM",
        closeTime: "5:00 PM",
      },
    },
    ...overrides,
  };
};

export const MODES = {
  EDIT: "edit",
  VIEW: "view",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE": {
      return {
        ...state,
        [MODES.VIEW]: { ...state.edit },
      };
    }
    case "CHANGE_OPEN_CLOSE": {
      const { day, value } = action;
      const editState = state[MODES.EDIT];
      const newEditState = {
        ...editState,
        [day]: { ...editState[day], open: value },
      };
      return { ...state, edit: newEditState };
    }

    case "CHANGE_OPEN_HOURS": {
      const { day, value } = action;
      const editState = state[MODES.EDIT];
      const newEditState = {
        ...editState,
        [day]: { ...editState[day], startTime: value },
      };
      return { ...state, edit: newEditState };
    }

    case "CHANGE_CLOSE_HOURS": {
      const { day, value } = action;
      const editState = state[MODES.EDIT];
      const newEditState = {
        ...editState,
        [day]: { ...editState[day], closeTime: value },
      };
      return { ...state, edit: newEditState };
    }

    default:
      throw new Error("unhandled action type");
  }
};

const HoursOfOperationValueContext = React.createContext();
const HoursOfOperationDispatchContext = React.createContext();

export const HoursOfOperationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, createInitState());

  return (
    <HoursOfOperationValueContext.Provider value={state}>
      <HoursOfOperationDispatchContext.Provider value={dispatch}>
        {children}
      </HoursOfOperationDispatchContext.Provider>
    </HoursOfOperationValueContext.Provider>
  );
};

export const useHoursOfOperationContext = (dayOfWeek, mode) => {
  const context = React.useContext(HoursOfOperationValueContext);
  if (!context)
    throw new Error("hours consumers need to be wrapped with a provider");
  console.log('ctx', context, mode, dayOfWeek);
  return context[mode][dayOfWeek];
};

export const useHoursOfDispatch = () => {
  const context = React.useContext(HoursOfOperationDispatchContext);
  if (!context)
    throw new Error("dispatch consumers need to be wrapped with a provider");
  return context;
};
