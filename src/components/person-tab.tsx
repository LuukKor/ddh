import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ShowData from './show-data';
import { PeopleService } from '@/services/people';


interface PersonTabProps {
  url: string[]
}

const PersonTab = ({ url }: PersonTabProps): JSX.Element => {
  const peopleService = new PeopleService;
  const [urlIndex, setUrlIndex] = useState(0);
  const { data, status, isLoading } = useQuery({
    queryKey: ['tab_data', url[urlIndex]],
    queryFn: () => peopleService.getDataByUrl(url[urlIndex]),
  });

  return (
    <>
      {!isLoading ? status === 'success'
        ? (
          <>
            {data && <ShowData data={data} />}
            {url.length > 1 && (
              <Stack direction={'row'} justifyContent={'center'} p={2} my={2} gap={2}>
                {urlIndex > 0 && <Button variant="contained" onClick={() => setUrlIndex(urlIndex - 1)}>Prev</Button>}
                {urlIndex < url.length - 1 && <Button variant="contained" onClick={() => setUrlIndex(urlIndex + 1)}>Next</Button>}
              </Stack>
            )}
          </>
        )
        : <Typography>Error</Typography>
        : <Stack alignItems={'center'} p={4}>
          <CircularProgress />
        </Stack>
      }
    </>
  );
}

export default PersonTab;
