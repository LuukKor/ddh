
import { Box, Typography } from '@mui/material';
import { uppercaseFirstLetter, removeUnderscore } from '@/utils/string';
import { APIList } from '@/types/api';
import { DataAPI } from '@/types/data';
import { PeopleAPI } from '@/types/people';

interface IShowData {
  data: APIList<DataAPI> | PeopleAPI,
  fields?: string[]
}

const ShowData = ({ data, fields = [] }: IShowData): JSX.Element => {
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
