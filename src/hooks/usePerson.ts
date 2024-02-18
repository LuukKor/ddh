import { QueryStatus, useQuery } from '@tanstack/react-query';

import { PeopleAPI } from '@/types/people';

import { PeopleService } from '@/services/people';
import { APIList } from '@/types/api';

interface State {
  status: QueryStatus;
  person: PeopleAPI | undefined;
}

const PEOPLES_KEY = 'people';

const usePerson = (id: string): State => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [PEOPLES_KEY, id],
    queryFn: () => peopleService.getPerson(id),
  });

  return {
    status: status,
    person: data?.results[0],
  };
};

export default usePerson;
