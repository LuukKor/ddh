import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import { PeopleAPI } from '@/types/people';
import { APIList } from '@/types/api';
import { uppercaseFirstLetter, removeUnderscore } from '@/utils/string';

import PersonTab from './person-tab';
import { DataAPI } from '@/types/data';


interface PersonProps {
  person: PeopleAPI,
  getDataByUrl: (url: string) => Promise<APIList<DataAPI>>
}

const Person = ({ person, getDataByUrl }: PersonProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const urlFields = ['homeworld', 'vehicles', 'starships', 'films', 'species'];
  const basicDataFields = ['name', 'height', 'mass', 'gender', 'hair_color', 'skin_color', 'eye_color', 'birth_year'];

  const isNotEmpty = (field: [string, string[]], fields: string[]) => fields.includes(field[0]) && field[1].length !== 0;
  const handleTabChange = (_: SyntheticEvent, newTab: number) => setActiveTab(newTab);

  let tabIndex = 0;

  return <>
    <Typography variant="h3" align="center" my={2}>
      {person.name}
    </Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} maxWidth={600} width={'100%'}>
      <Tabs
        scrollButtons="auto"
        allowScrollButtonsMobile={true}
        variant="scrollable"
        value={activeTab}
        onChange={handleTabChange}
        centered={true}
      >
        <Tab label="Basic" />
        {Object.entries(person).map((el: [string, string[]], i: number) => {
          if (isNotEmpty(el, urlFields)) return <Tab key={el[0]} label={el[0]} />
        })}
      </Tabs>
      <>
        {Object.entries(person).map(el => {
          if (isNotEmpty(el, basicDataFields) && activeTab === 0) return <Typography key={el[0]} variant="subtitle1">
            {uppercaseFirstLetter(removeUnderscore(el[0]))}: <b>{el[1]}</b>
          </Typography>
        })}
      </>
      {Object.entries(person).map((el: [string, string[]]) => {
        if (isNotEmpty(el, urlFields)) {
          tabIndex++;
          if (activeTab === tabIndex) return <PersonTab
            key={el[0]}
            getDataByUrl={getDataByUrl}
            url={([] as string[]).concat(el[1])}
          />
        }
      })}
    </Box >
  </>
};

export default Person;
