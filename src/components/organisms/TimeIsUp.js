import React from "react";

export default function TimeIsUp() {
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <span
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
        }}
      >
        Time is up
      </span>
      <a
        style={{
          fontSize: "2rem",
          fontWeight: "bolder",
        }}
        href="."
      >
        start again
      </a>
    </div>
  );
}
