import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hours = time.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
//   const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <Typography variant='body1 ' component="div">
      ⏰ {formattedHours}:{minutes} {amPm}
    </Typography>
  );
}

export default DigitalClock;
