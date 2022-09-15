import { useEffect, useState, useRef } from "react";

import Countdown from "react-countdown";

import { Container, Button, Form, Navbar, Nav } from "react-bootstrap";

import "../styles/App.css";

function App() {
  const countDownRef = useRef();
  const [countdownDate, setCountdownDate] = useState(Date.now() + 5000);
  const [countdownDateHalfway, setCountdownDateHalfway] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [userInputMinutes, setUserInputMinutes] = useState(0);
  const [userInputSeconds, setUserInputSeconds] = useState(0);
  const [startedCountdown, setStartedCountdown] = useState(false);

  const [halfwayMessage, setHalfwayMessage] = useState(true);
  const [lastMinuteMessage, setLastMinuteMessage] = useState(true);

  const [options, setOptions] = useState({
    prevTime: 0,
    volume: 1,
    rate: 1,
    pitch: 1,
    useSeconds: false,
    onHalfwayMessage: "You are now halfway through your time for this section.",
    onLastMinuteMessage: "You have 1 minute remaining",
    onEndMessage: "Stop working, pencils down, your time is up.",
  });

  const textToSpeech = async (text, onEnd) => {
    let speakObj = new SpeechSynthesisUtterance();
    speakObj.text = ". " + text;
    speakObj.volume = options.volume;
    speakObj.rate = options.rate;
    speakObj.pitch = options.pitch;
    speakObj.voice = speechSynthesis.getVoices().filter(function (voice) {
      return voice.name === "Microsoft Hazel - English (United Kingdom)";
    })[0];
    speakObj.onend = onEnd;
    speechSynthesis.speak(speakObj);
  };

  useEffect(() => {
    speechSynthesis.getVoices();
  }, []);

  const onTick = ({
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    completed,
  }) => {
    if (lastMinuteMessage) {
      if (minutes === 1 && seconds === 0) {
        textToSpeech(options.onLastMinuteMessage, () => {});
      }
    }

    if (
      countdownDateHalfway.minutes === minutes &&
      countdownDateHalfway.seconds === seconds
    ) {
      if (halfwayMessage) {
        textToSpeech(options.onHalfwayMessage, () => {});
      }
    }
  };

  const renderer = ({
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    completed,
  }) => {
    if (!startedCountdown) return null;

    if (completed) {
      // Render a completed state
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
    } else {
      // Render a countdown
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
  };

  const handleStart = () => {
    let minutes = userInputMinutes * 60 * 1000;
    let seconds = userInputSeconds * 1000;
    textToSpeech(
      `You have ${userInputMinutes > 0 ? `${userInputMinutes} minutes` : ""} ${
        userInputSeconds > 0 ? `${userInputSeconds} seconds` : ""
      } for this section and your time starts now`,
      () => {
        setStartedCountdown(true);
        setCountdownDateHalfway({
          minutes: Math.floor((minutes + seconds) / 2 / 1000 / 60),
          seconds: Math.floor((minutes + seconds) / 2 / 1000) % 60,
        });
        setCountdownDate(Date.now() + minutes + seconds);
        countDownRef.current.start();
      }
    );
  };

  const handleComplete = () => {
    textToSpeech(options.onEndMessage, () => {});
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "relative",
      }}
    >
      <div className="w-100">
        <Navbar bg="dark" variant="dark" className="position-relative">
          <Container fluid>
            <Nav className="me-auto">
              <Nav.Link>
                Last Updated: {new Date().toLocaleTimeString()}
              </Nav.Link>
              {/* RESET PAGE BUTTON */}
              <Nav.Link
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="d-flex h-100 flex-column">
        <Countdown
          ref={countDownRef}
          onComplete={handleComplete}
          date={countdownDate}
          renderer={renderer}
          autoStart={false}
          onTick={onTick}
        />

        {
          // START COUNTDOWN
          startedCountdown ? (
            <>
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
            </>
          ) : (
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
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
