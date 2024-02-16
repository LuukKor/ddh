import { Box, CircularProgress, Divider, Pagination, Stack } from '@mui/material';

import usePeoples from '@/hooks/usePeoples';

import PeoplesList from './peoples-list';

const Peoples = (): JSX.Element => {
  const { peoples, status } = usePeoples(1);

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      {status === 'success' && peoples ? (
        <Stack gap={2}>
          <PeoplesList peoples={peoples.list} />
          <Divider />
          <Pagination count={1} />
        </Stack>
      ) : (
        <Box p={4}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default Peoples;
