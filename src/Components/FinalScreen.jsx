export const FinalScreen = ({
  points,
  maxPossibePoints,
  highscore,
  dispatch,
}) => {
  console.log("maxPossibePoints", maxPossibePoints);

  const percentage = (points / maxPossibePoints) * 100;
  console.log("percentage", percentage);

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossibePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highcore: {highscore} Points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};
