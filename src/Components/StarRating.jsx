import React from "react";

const StarRating = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <div>10</div>
    </div>
  );
};

export default StarRating;
