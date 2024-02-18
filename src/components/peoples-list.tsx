import Link from 'next/link';

import { Typography } from '@mui/material';
import { People } from '@/types/people';

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): JSX.Element => {

  // function getIdFromUrl(i: number): number | void {
  //   let id: number | string[] = peoples[i].url.split('/').filter(el => el !== "");
  //   id = parseInt(id[id.length - 1]);

  //   if (!isNaN(id)) {
  //     return id;
  //   } else {
  //     console.error('ID jest niepoprawne.')
  //   }
  // }

  return (
    <>
      {peoples.map((x, i) => (
        <Link key={x.name} href={`/person/${x.name}`}>
          <Typography variant="subtitle1">
            {x.name}
          </Typography>
        </Link>
      ))}
    </>
  );
};

export default PeoplesList;
