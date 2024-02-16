import { Typography } from '@mui/material';

import { People } from '@/types/people';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): JSX.Element => {
  const router = useRouter()

  //TODO: maybe? -> set active person and pass url to context

  function getIdFromUrl(i: number): number | void {
    let id: number | string[] = peoples[i].url.split('/').filter(el => el !== "");
    id = parseInt(id[id.length - 1]);

    if (!isNaN(id)) {
      return id;
    } else {
      console.error('ID jest niepoprawne.')
    }
  }

  return (
    <>
      {peoples.map((x, i) => (
        <Link key={x.name} href={`/person/${getIdFromUrl(i)}`}>
          <Typography variant="subtitle1">
            {x.name} - {x.url}
          </Typography>
        </Link>
      ))}
    </>
  );
};

export default PeoplesList;
