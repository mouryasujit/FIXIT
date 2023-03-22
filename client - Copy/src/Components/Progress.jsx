import React, { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  const [percentage, setPercentage] = useState(50);
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "red",
          pathColor: "#2dda3e",
          trailColor: "gray",
        })}
      />
    </div>
  );
};

export default Progress;
