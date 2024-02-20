
import { Box, Typography } from '@mui/material';

import { APIList } from '@/types/api';
import { DataAPI } from '@/types/data';
import { PeopleAPI } from '@/types/people';

import { removeUnderscore, uppercaseFirstLetter } from '@/utils/string';

interface IShowData {
  data: APIList<DataAPI> | PeopleAPI
}

const ShowData = ({ data }: IShowData): JSX.Element => {
  const hiddenFields = ['homeworld', 'vehicles', 'starships', 'films', 'species', 'created', 'edited', 'url', 'residents', 'pilots', 'characters', 'planets', 'people'];

  return <>
    {data && (
      <Box p={2}>
        {Object.entries(data).map(el => {
          if (!hiddenFields.includes(el[0])) {
            return <Typography key={el[0]} variant="subtitle1">
              {uppercaseFirstLetter(removeUnderscore(el[0]))}: <b>{el[1]}</b>
            </Typography>
          }
        })}
      </Box>
    )}
  </>;
};

export default ShowData;
