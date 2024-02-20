import Link from 'next/link';

import { Typography } from '@mui/material';

import { People } from '@/types/people';

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): JSX.Element => {
  function getIdFromUrl(i: number): number | string {
    if (!peoples) return -1;
    const slitUrl: string[] = peoples[i].url?.split('/').filter(el => el !== "") || [];
    const id: number = parseInt(slitUrl[slitUrl.length - 1]);

    if (!isNaN(id)) {
      return id;
    } else {
      return ''
    }
  }

  return (
    <>
      {peoples.map((x, i) => (
        <Link key={x.name} href={`/people/${getIdFromUrl(i)}`} style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle1">
            {x.name}
          </Typography>
        </Link>
      ))}
    </>
  );
};

export default PeoplesList;
