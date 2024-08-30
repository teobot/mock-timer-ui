import React from "react";
import { Form } from "react-bootstrap";

export default function CountdownTimer({ minutes = 0, seconds = 0 }) {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="d-flex flex-row h-50 w-75 p-4">
        <div className="w-50 h-100 me-2">
          <Form.Control
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "10vw",
              color: "#212529",
              textAlign: "center",
              fontWeight: "bold",
            }}
            type="number"
            value={minutes}
            disabled
          />
          <p className="text-center lead">Minutes</p>
        </div>

        <div className="w-50 h-100 ms-2">
          <Form.Control
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "10vw",
              color: "#212529",
              textAlign: "center",
              fontWeight: "bold",
            }}
            type="number"
            value={seconds}
            disabled
          />

          <p className="text-center lead">Seconds</p>
        </div>
      </div>
    </div>
  );
}
