import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import { Mains } from "./Mains";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./StartScreen";
import { Questions } from "./Questions";
import { NextQuestion } from "./Components/NextQuestion";
import { Progress } from "./Components/Progress";
import { FinalScreen } from "./Components/FinalScreen";
import { Footer } from "./Components/Footer";
import { Timer } from "./Components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSeconds: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finash":
      return {
        ...state,
        status: "finshed",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finshed" : state.status,
      };
    default:
      throw new Error("Unexpected Action");
  }
}

export default function App() {
  const [
    { status, questions, index, answer, points, highscore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossibePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Mains>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Footer>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossibePoints={maxPossibePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestion
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
            <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
          </Footer>
        )}
        {status === "finshed" && (
          <FinalScreen
            maxPossibePoints={maxPossibePoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Mains>
    </div>
  );
}
