import React from "react";

const formWrapperStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

// todo: remove type 'any'
const modalStyle: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24",
  p: 4,
};

const translateHistory: React.CSSProperties = {
  maxHeight: "10rem",
  overflow: "scroll",
};

// todo: remove type 'any'
export const styles: any = {
  formWrapperStyle,
  modalStyle,
  translateHistory,
};
