import { useRouter } from 'next/router';

import { Button, Stack } from '@mui/material';

const BackButton = (): JSX.Element => {
  const { back } = useRouter()

  return (
    <Stack alignSelf="flex-end" mb={1}>
      <Button onClick={back} variant="outlined">Go back</Button>
    </Stack >
  );
};

export default BackButton;
