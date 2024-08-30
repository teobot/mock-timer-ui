// react
import { useEffect, useState, useRef } from "react";

// libs
import Countdown from "react-countdown";

// components
import TimeIsUp from "../components/organisms/TimeIsUp";
import CountdownTimer from "../components/organisms/CountdownTimer";
import NavBar from "../components/molecules/NavBar";
import TimeEditor from "../components/organisms/TimeEditor";
import TimeDownControls from "../components/organisms/TimeDownControls";

// styles
import "../styles/App.css";

function App() {
  const countDownRef = useRef();
  const [countdownDate, setCountdownDate] = useState(Date.now() + 5000);
  const [userInputMinutes, setUserInputMinutes] = useState(0);
  const [userInputSeconds, setUserInputSeconds] = useState(0);
  const [startedCountdown, setStartedCountdown] = useState(false);

  const [timerMessages, setTimerMessages] = useState([
    {
      msg: "You have 1 minute remaining",
      trg: (m, s, t) => m === 1 && s === 0,
      enabled: true,
      desc: "Triggers when there is 1 minute remaining",
    },
    {
      msg: "You have 2 minute remaining",
      trg: (m, s, t) => m === 2 && s === 0,
      enabled: true,
      desc: "Triggers when there is 2 minute remaining",
    },
    {
      msg: "You have 5 minutes remaining",
      trg: (m, s, t) => m === 5 && s === 0,
      enabled: true,
      desc: "Triggers when there is 5 minutes remaining",
    },
    {
      msg: "You are now halfway through your time for this section.",
      trg: (m, s, t) => t / 2 === m * 60 + s,
      enabled: true,
      desc: "Triggers when you are halfway through your time",
    },
    {
      msg: "Stop working, pencils down, your time is up.",
      trg: (m, s, t) => m === 0 && s === 1,
      enabled: true,
      desc: "Triggers when your time is up",
    },
  ]);

  const [options, setOptions] = useState({
    prevTime: 0,
    volume: 1,
    rate: 1,
    pitch: 1,
    useSeconds: false,
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
    timerMessages.forEach((timerMessage) => {
      if (!timerMessage.enabled) return;
      if (
        timerMessage.trg(
          minutes,
          seconds,
          Number(userInputMinutes) * 60 + Number(userInputSeconds)
        )
      ) {
        textToSpeech(timerMessage.msg, () => {});
      }
    });
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
      return <TimeIsUp />;
    } else {
      // Render a countdown
      return <CountdownTimer minutes={minutes} seconds={seconds} />;
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
        setCountdownDate(Date.now() + minutes + seconds);
        countDownRef.current.start();
      }
    );
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
        <NavBar />
      </div>
      <div className="d-flex h-100 flex-column">
        <Countdown
          ref={countDownRef}
          date={countdownDate}
          renderer={renderer}
          autoStart={false}
          onTick={onTick}
        />

        {
          // START COUNTDOWN
          startedCountdown ? (
            <TimeDownControls countDownRef={countDownRef} />
          ) : (
            <TimeEditor
              userInputMinutes={userInputMinutes}
              setUserInputMinutes={setUserInputMinutes}
              userInputSeconds={userInputSeconds}
              setUserInputSeconds={setUserInputSeconds}
              handleStart={handleStart}
              timerMessages={timerMessages}
              setTimerMessages={setTimerMessages}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
