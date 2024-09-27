import { Stack, Typography } from "@mui/material";
import GuessGridItem from "../grids/GuessGridItem";
import { Weapon, WEAPON_ORDER } from "../../config/weaponType";

const GameOver = ({dailyItem}: {dailyItem?: Weapon}) => {
	return (
		<Stack alignItems="center" justifyContent='center' mt={15}>
			<Typography variant="h5">Game over!</Typography>
			<Typography variant="subtitle1">The weapon was..</Typography>
			<Stack spacing={2} mt={3} width="100%" alignItems="center">
				<Typography variant="h5" sx={{ borderBottom: '2px solid white' }}>
					{dailyItem?.name}
				</Typography>
				<GuessGridItem order={WEAPON_ORDER.slice(2)} correctItem={dailyItem} />
			</Stack>
		</Stack>
	);
};

export default GameOver;
