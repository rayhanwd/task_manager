import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  // Format the current time as HH:MM:SS AM/PM
  const hours = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const amPm = currentTime.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-md capitalize">
        {`Time: ${hours}:${minutes}:${seconds} ${amPm}`}
      </h1>
    </div>
  );
};

export default LiveClock;
