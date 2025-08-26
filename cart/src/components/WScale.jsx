import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const WScale = ({ weight }) => {
  // Calculate percentage based on weight (0-40 kg scale)
  const weightPercentage = (weight / 40) * 100;

  return (
    <div style={{ width: 200, height: 200, margin: "auto" }}>
      <CircularProgressbar
        value={weightPercentage}
        text={`${weight} KG`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: "#614d99",
          textColor: "#000",
          trailColor: "#d6d6d6",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default WScale;
