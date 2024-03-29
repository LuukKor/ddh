import { SyntheticEvent, useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { PeopleAPI } from '@/types/people';

import PersonTab from './person-tab';
import ShowData from './show-data';


interface PersonProps {
  person: PeopleAPI
}

const urlFields = ['homeworld', 'vehicles', 'starships', 'films', 'species'];

const Person = ({ person }: PersonProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

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
      >
        <Tab label="Basic" />
        {Object.entries(person).map((el: [string, string[]]) => {
          if (isNotEmpty(el, urlFields)) return <Tab key={el[0]} label={el[0]} />
        })}
      </Tabs>
      {activeTab === 0 && (
        <ShowData data={person} />
      )}
      {Object.entries(person).map((el: [string, string[]]) => {
        if (isNotEmpty(el, urlFields)) {
          tabIndex++;
          if (activeTab === tabIndex) return <PersonTab
            key={el[0]}
            url={([] as string[]).concat(el[1])}
          />
        }
      })}
    </Box >
  </>
};

export default Person;
