import { useEffect, useState, useRef } from "react";

import Countdown from "react-countdown";

import { Container, Button, Form, Navbar, Nav } from "react-bootstrap";

import "../styles/App.css";

function App() {
  const countDownRef = useRef();
  const [options, setOptions] = useState({
    time: 0,
    prevTime: 0,
    volume: 1,
    rate: 1,
    pitch: 1,
    started: false,
    useSeconds: true,
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

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (!options.started) {
      return null;
    }
    if (completed) {
      // Render a completed state
      return (
        <div>
          <h1>Time is up</h1>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const handlePlay = () => {
    textToSpeech(
      `You have ${options.time} minutes for this section and your time starts now`,
      () => {
        setOptions({ ...options, started: true });
        countDownRef.current.start();
      }
    );
  };

  const handlePause = () => {
    countDownRef.current.pause();
  };

  const handleComplete = () => {
    textToSpeech(options.onEndMessage, () => {
      setOptions({ ...options, started: false });
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link>Last Updated: {new Date().toLocaleTimeString()}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <div className="m-2 p-2">
          <Countdown
            ref={countDownRef}
            onComplete={handleComplete}
            date={
              Date.now() + options.time * 1000 * (options.useSeconds ? 1 : 60)
            }
            renderer={renderer}
          />
        </div>
        <div className="p-2 m-2">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Time (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={options.time}
              onChange={(e) => {
                setOptions({ ...options, time: e.target.value });
              }}
            />
          </Form.Group>
        </div>
        <div className="p-2 m-2">
          {options.started ? (
            <Button variant="danger" onClick={handlePause}>
              Pause
            </Button>
          ) : (
            <Button variant="success" onClick={handlePlay}>
              Play
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
