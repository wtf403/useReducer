import { useReducer, useEffect } from "react";

type State = {
  running: boolean;
  seconds: number;
};

const ACTIONS = {
  TICK: "TICK",
  START: "START",
  STOP: "STOP",
  RESET: "RESET",
} as const;

type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

const reducer = (
  state: State,
  action: { type: Action; payload?: any }
): State => {
  switch (action.type) {
    case ACTIONS.TICK:
      return { ...state, seconds: state.seconds + 1 };
    case ACTIONS.START:
      return { ...state, running: true };
    case ACTIONS.STOP:
      return { ...state, running: false };
    case ACTIONS.RESET:
      return { ...state, running: false, seconds: 0 };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    seconds: 0,
  });

  useEffect(() => {
    let intervalId;
    if (state.running) {
      intervalId = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [state.running]);

  const formatTime = (t) => {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t % 3600) / 60);
    const seconds = t % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center flex-col gap-4">
      <span className="text-3xl w-[123px]">{formatTime(state.seconds)}</span>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch({ type: ACTIONS.START })}
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Start
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.STOP,
            })
          }
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Stop
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.RESET,
            })
          }
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
