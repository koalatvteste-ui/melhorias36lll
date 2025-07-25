import { useEffect, useState } from "react";

export const useCountdown = (startDate: string) => {
  const startDateTime = new Date(startDate).getTime();

  const [timeSince, setTimeSince] = useState(
    new Date().getTime() - startDateTime
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(new Date().getTime() - startDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateTime]);

  const days = Math.floor(timeSince / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeSince % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeSince % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeSince % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};