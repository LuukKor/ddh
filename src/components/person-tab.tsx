import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { APIList } from '@/types/api';
import { DataAPI } from '@/types/data';
import { uppercaseFirstLetter } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';


interface PersonTabProps {
  children?: React.ReactNode;
  getDataByUrl: (url: string) => Promise<APIList<DataAPI>>
  url: string[]
}

const PersonTab = (props: PersonTabProps): JSX.Element => {
  const [urlIndex, setUrlIndex] = useState(0);
  const { children, url, getDataByUrl } = props;
  const { data, status, isLoading } = useQuery({
    queryKey: ['tab_data', url[urlIndex]],
    queryFn: () => getDataByUrl(url[urlIndex]),
  });
  const hiddenFields = ['homeworld', 'vehicles', 'starships', 'films', 'species', 'created', 'edited', 'url', 'residents', 'pilots', 'characters', 'planets'];

  function getChild() {
    if (children) {
      return <Typography component={'span'}>{children}</Typography>
    } else {
      if (data) {
        return <Stack p={2}>
          {Object.entries(data).map(el2 => {
            if (!hiddenFields.includes(el2[0])) {
              return <>
                <Typography key={el2[0]} variant="subtitle1">
                  {uppercaseFirstLetter(el2[0])}: <b>{el2[1]}</b>
                </Typography>
              </>
            }
          })}
          {url.length > 1 && (
            <Stack direction={'row'} justifyContent={'center'} my={2} gap={2}>
              {urlIndex > 0 && <Button variant="contained" onClick={() => setUrlIndex(urlIndex - 1)}>Prev</Button>}
              {urlIndex < url.length - 1 && <Button variant="contained" onClick={() => setUrlIndex(urlIndex + 1)}>Next</Button>}
            </Stack>
          )}

        </Stack>
      }
    }
  }

  return (
    <>
      {!isLoading && status === 'success'
        ? getChild()
        : (
          <Box p={4}>
            <CircularProgress />
          </Box>
        )}
    </>
  );
}

export default PersonTab;