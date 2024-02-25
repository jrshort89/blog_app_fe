import React from "react";

const list: React.CSSProperties = {
  maxHeight: "10rem",
  overflow: "auto",
};

class Properties<T, U> {}

const body: Properties<string | number, string & {}> = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100svh",
  justifyContent: "space-evenly",
  marginTop: "12rem",
  width: "100svw",
};

// todo: remove type 'any'
export const styles: any = {
  body,
  list,
};
