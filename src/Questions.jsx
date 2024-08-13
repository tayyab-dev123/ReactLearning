import { Question } from "./Components/Question";

export const Questions = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Question question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};
