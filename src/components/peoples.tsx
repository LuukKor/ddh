import { Box, CircularProgress, Divider, Pagination, Stack } from '@mui/material';

import usePeoples from '@/hooks/usePeoples';

import PeoplesList from './peoples-list';
import { ChangeEvent, useState } from 'react';

const Peoples = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { peoples, status, totalPage } = usePeoples(page);

  function handlePaginationChange(_: ChangeEvent<unknown>, targetPage: number): void {
    setPage(targetPage)
  }

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      {status === 'success' && peoples ? (
        <Stack gap={2}>
          <PeoplesList peoples={peoples.list} />
          <Divider />
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePaginationChange}
          />
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
