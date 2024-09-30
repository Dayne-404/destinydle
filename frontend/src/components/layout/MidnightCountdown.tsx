import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimatedNumber from 'react-animated-numbers';

const MidnightCountdown = () => {
	const getTimeUntilMidnight = () => {
		const now = new Date();
		const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		return midnight.getTime() - now.getTime();
	};

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

			setHours(h);
			setMinutes(m);
			setSeconds(s);
		};

		const intervalId = setInterval(updateClock, 1000);
		updateClock();

		return () => clearInterval(intervalId);
	}, []);

	return (
		<Typography variant="h5">
			<Stack direction="row" justifyItems="center" alignItems="center" spacing={0.2}>
				<AnimatedNumber
					animateToNumber={Math.floor(hours / 10)}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
				<AnimatedNumber
					animateToNumber={hours % 10}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
				<Typography variant='h5'>:</Typography>
				<AnimatedNumber
					animateToNumber={Math.floor(minutes / 10)}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
				<AnimatedNumber
					animateToNumber={minutes % 10}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
				<Typography variant='h5'>:</Typography>
				<AnimatedNumber
					animateToNumber={Math.floor(seconds / 10)}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
				<AnimatedNumber
					animateToNumber={seconds % 10}
					transitions={() => ({ type: 'spring', damping: 20 })}
				/>
			</Stack>
		</Typography>
	);
};

export default MidnightCountdown;
