import React from "react";

export default function Notify({ errorMessage }) {
  if (!errorMessage) return null;
  return <div style={{ color: "red" }}>{errorMessage}</div>;
}
