import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/StarRating";
import App from "./App.jsx";
import "./index.css";

const Test = () => {
  const [rating, setRating] = React.useState(0);
  return (
    <div>
      <StarRating color="blue" MaxRating={10} onSettingRating={setRating} />
      <p>User rated this movie {rating} stars</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      MaxRating={5}
      Message={["Terrible", "Okay", "Good", "Amzaing", "Best"]}
    /> */}
    <Test />
  </React.StrictMode>
);
