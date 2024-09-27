import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimatedNumber from 'react-animated-numbers';

const Clock = () => {
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return midnight.getTime() - now.getTime();
  };

  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateClock = () => {
      const remainingTime = getTimeUntilMidnight();
      const totalSeconds = Math.floor(remainingTime / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft(remainingTime);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Initialize immediately

    return () => clearInterval(intervalId);
  }, []);

  // Helper function to format numbers as two digits
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div>
      <Typography variant="h5" display="flex" alignItems="center">
        <AnimatedNumber
          animateToNumber={Math.floor(hours / 10)}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
        <AnimatedNumber
          animateToNumber={hours % 10}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
        {' : '}
        <AnimatedNumber
          animateToNumber={Math.floor(minutes / 10)}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
        <AnimatedNumber
          animateToNumber={minutes % 10}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
        {' : '}
        <AnimatedNumber
          animateToNumber={Math.floor(seconds / 10)}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
        <AnimatedNumber
          animateToNumber={seconds % 10}
          transitions={() => ({ type: 'spring', damping: 20 })}
        />
      </Typography>
      <Button onClick={() => setSeconds((prev) => prev + 1)}>Test</Button>
    </div>
  );
};

export default Clock;
