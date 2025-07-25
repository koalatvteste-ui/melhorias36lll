import { useEffect, useState } from "react";

export const useDaysLived = (startDate: string = "2022-07-25") => {
  const startDateTime = new Date(startDate).getTime();
  const [timeLived, setTimeLived] = useState(
    new Date().getTime() - startDateTime
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLived(new Date().getTime() - startDateTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startDateTime]);

  const days = Math.floor(timeLived / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLived % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLived % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLived % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalDays: days };
};