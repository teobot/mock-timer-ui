import React from "react";

import { Button } from "react-bootstrap";

export default function TimeDownControls({ countDownRef }) {
  return (
    <div className="w-100 h-25 p-1 mt-2 mb-2 d-flex justify-content-evenly">
      <Button
        style={{
          fontSize: "2vw",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="w-25 h-100"
        variant="success"
        onClick={() => {
          countDownRef.current.pause();
        }}
      >
        pause
      </Button>
      <Button
        style={{
          fontSize: "2vw",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="w-25 h-100"
        variant="primary"
        onClick={() => {
          countDownRef.current.start();
        }}
      >
        resume
      </Button>
    </div>
  );
}
