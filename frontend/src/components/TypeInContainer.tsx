// this component will get data like paragraph from the backend/server.
import styles from "./TypeInContainer.module.css";
import { useState, useEffect, useRef } from "react";

const exampleText: string =
  "The forest was alive with the gentle hum of nature’s melody. Sunlight streamed through the dense canopy of leaves, casting dappled shadows on the forest floor. A soft breeze carried the earthy scent of moss and wildflowers, mingling with the distant sound of a babbling brook. Birds flitted from branch to branch, their cheerful songs creating a symphony of joy. Hidden among the towering trees, a deer grazed peacefully, its ears twitching at every faint rustle. The air was cool, refreshing, and filled with the quiet energy of life that only untouched wilderness can offer. As the day stretched on, the forest seemed to shift subtly. The light grew warmer, painting the scenery with golden hues. A squirrel darted across the path, clutching an acorn tightly in its tiny paws. Nearby, the undergrowth rustled, hinting at unseen creatures moving about their daily routines. Time felt suspended here, as if the world outside ceased to exist. The serenity was almost tangible, inviting anyone who entered to pause and breathe deeply. Further along the trail, an ancient oak stood as a sentinel, its gnarled roots weaving a tale of centuries past. Carved into its bark were initials, a testament to a long-forgotten visit. The brook, now closer, revealed its crystal-clear waters, tumbling over smooth stones with a soothing rhythm. Tiny fish darted in the shallows, their scales glinting like silver. As the sun began to dip below the horizon, the forest took on an ethereal glow. Fireflies emerged, their delicate lights dancing in the growing twilight. The once-vivid greens turned to dusky blues and purples, wrapping the woodland in a soft embrace. It was a reminder of the beauty and tranquility found in the heart of nature, a retreat from the noise of the world.";

interface TypingTimer {
  hours: number;
  minutes: number;
  seconds: number;
}

type TimerDataObj = TypingTimer;

function TypeInContainer(): JSX.Element {
  const inputRef = useRef<string>("");
  const [TimerData, setTimerData] = useState<TimerDataObj>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [typeTimer, setTypeTimer] = useState<TypingTimer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [wrdperminute,setWrdPerMinute] = useState<number>(0);

  function onCustomTimerBtnClicked(time: number): void {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setTypeTimer({ hours: 0, minutes: minutes, seconds: seconds });
    setTimerData({ hours: 0, minutes: minutes, seconds: seconds });
    setIsRunning(true);
  }

  function getwpmOnChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    inputRef.current = e.target.value;
  }

  useEffect(
    function () {
      if (!isRunning) return;
      const timer: ReturnType<typeof setInterval> = setInterval(() => {
        setTypeTimer((prev: TypingTimer) => {
          const { seconds, minutes } = prev;
          if (seconds > 0) {
            return { ...prev, seconds: seconds - 1 };
          } else if (minutes > 0) {
            return { ...prev, minutes: minutes - 1, seconds: 59 };
          } else {
            setIsRunning(false);
            clearInterval(timer);
            const wrdArr = inputRef.current?.trim().split(/\s+/) || [];
            const wrdsCount = wrdArr.filter((wrd) => wrd !== "").length;
            const totalMinutes = TimerData.minutes + TimerData.seconds / 60;
            if (totalMinutes > 0) {
              const wpm = wrdsCount / totalMinutes;
              setWrdPerMinute(wpm);
              console.log(`Words per minute: ${Math.round(wpm)}`);
              console.log(inputRef,"  <-> minutes : ",TimerData.minutes," <-> seconds",TimerData.seconds);
            } else {
              console.log("Timer was not set.");
            }
            return prev;
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    },
    [isRunning]
  );

  return (
    <div className="px-2 py-4">
      <p>
        Timer = {typeTimer.minutes}m : {typeTimer.seconds}s
      </p>
      <p>Word Per Minute: {wrdperminute}</p>
      <div className="flex space-x-4">
        {/* different timer button */}
        <div
          onClick={() => onCustomTimerBtnClicked(30)}
          className="p-2 bg-orange-500 rounded-md text-white"
        >
          <button>30s</button>
        </div>
        <div
          onClick={() => onCustomTimerBtnClicked(60)}
          className="p-2 bg-orange-500 rounded-md text-white"
        >
          <button>1 min</button>
        </div>
        <div
          onClick={() => onCustomTimerBtnClicked(120)}
          className="p-2 bg-orange-500 rounded-md text-white"
        >
          <button>2 min</button>
        </div>
      </div>
      <p>{exampleText}</p>
      <textarea
        onChange={getwpmOnChange}
        className={`w-full border border-black p-2 ${styles.textfield}`}
      />
    </div>
  );
}

export default TypeInContainer;
