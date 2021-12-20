import React, { createContext } from "react";

export const ThemeContext = createContext<TC>({} as TC);

const themeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = (props: IThemeProvider) => {
  const { children } = props;

  const [state, dispatch] = React.useReducer(themeReducer, {
    color: "#58249c",
    mode: "light",
  });

  // custom logic
  const changeColor = (color: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode: TC["mode"]) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    //@ts-ignore
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface TC {
  color: string;
  mode: "dark" | "light";
  changeColor: Function;
  changeMode: Function;
}

interface IThemeProvider {
  children: any;
}
