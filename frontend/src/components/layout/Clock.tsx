import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import AnimatedNumber from "react-awesome-animated-number";

const Clock = () => {
	const getTimeUntilMidnight = () => {
		const now = new Date();
		const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		const difference = midnight.getTime() - now.getTime();
		return difference;
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

	const [number, setNumber] = useState(31);

	return (
		<div>
			<h1>Countdown to Midnight</h1>
			<h2>
				{hours}:{minutes}:{seconds}
				<AnimatedNumber
					value={number}
					minDigits={2} /> 
				<Button onClick={() => setNumber(number + 1)}>Test</Button>
			</h2>
		</div>
	);
};

export default Clock;
