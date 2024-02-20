

import { Button, Stack } from '@mui/material';

import { useRouter } from 'next/router';

const BackButton = (): JSX.Element => {
  const { back } = useRouter()

  return (
    <Stack alignSelf="flex-end" mb={1}>
      <Button onClick={back} variant="outlined">Go back</Button>
    </Stack >
  );
};

export default BackButton;
