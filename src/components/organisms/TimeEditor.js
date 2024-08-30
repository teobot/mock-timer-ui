import React from "react";

import { Button, Form } from "react-bootstrap";

export default function TimeEditor({
  userInputMinutes,
  userInputSeconds,
  setUserInputMinutes,
  setUserInputSeconds,
  handleStart,
  timerMessages,
  setTimerMessages,
}) {
  return (
    <div className="h-100 w-100 m-0 p-5 d-flex align-items-center justify-content-center">
      <div className="w-75 h-100">
        <div className="w-100 h-75 d-flex flex-row justify-content-center">
          <div className="w-50 h-100 pe-1">
            <Form.Control
              className="w-100 h-100"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "10vw",
                color: "#212529",
                textAlign: "center",
                fontWeight: "bold",
              }}
              max={60}
              min={0}
              type="number"
              value={userInputMinutes}
              onChange={(e) => {
                if (e.target.value > 60) {
                  setUserInputMinutes(60);
                } else if (e.target.value < 0) {
                  setUserInputMinutes(0);
                } else {
                  setUserInputMinutes(e.target.value);
                }
              }}
            />
            <p className="text-center lead">Minutes</p>
          </div>
          <div className="w-50 h-100 ps-1">
            <Form.Control
              className="w-100 h-100"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "10vw",
                color: "#212529",
                textAlign: "center",
                fontWeight: "bold",
              }}
              max={60}
              min={0}
              type="number"
              value={userInputSeconds}
              onChange={(e) => {
                if (e.target.value > 60) {
                  setUserInputSeconds(60);
                } else if (e.target.value < 0) {
                  setUserInputSeconds(0);
                } else {
                  setUserInputSeconds(e.target.value);
                }
              }}
            />
            <p className="text-center lead">Seconds</p>
          </div>
        </div>
        <div className="w-100 h-25 pt-5">
          <Button
            style={{
              fontSize: "3vw",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="w-100 h-100"
            variant="success"
            onClick={handleStart}
          >
            Play
          </Button>
        </div>
      </div>
      <div className="m-2 h-100 d-flex flex-column gap-2 w-auto">
        {
          // TIMER MESSAGES
          timerMessages.map((message, index) => (
            <div className="form-check border d-flex gap-2 align-items-center p-2">
              <input
                className="form-check-input m-0 p-0"
                type="checkbox"
                id={`flexCheckChecked_${message.msg}`}
                checked={message.enabled}
                onChange={() => {
                  const newMessages = [...timerMessages];
                  newMessages[index].enabled = !newMessages[index].enabled;
                  setTimerMessages(newMessages);
                }}
              />
              <label
                className="form-check-label m-0 p-0"
                for={`flexCheckChecked_${message.msg}`}
              >
                {message.desc}
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}
