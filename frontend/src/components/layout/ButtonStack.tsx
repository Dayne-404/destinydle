import { Stack, Button } from "@mui/material";

interface ButtonStackProps {
  onHint?: () => void;
  onGiveUp?: () => void;
}

const ButtonStack = ({
  onHint = () => {},
  onGiveUp = () => {},
}: ButtonStackProps) => {
  return (
    <Stack direction='row' spacing={2} justifyContent='center' pb={1}>
      <Button variant="contained" size="small" onClick={() => onHint()}>
        Hint
      </Button>
      <Button variant="contained" size="small" onClick={() => onGiveUp()}>
        Give Up
      </Button>
    </Stack>
  );
};

export default ButtonStack;
