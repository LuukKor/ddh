import { QueryStatus, useQuery } from '@tanstack/react-query';

import { APIList } from '@/types/api';
import { DataAPI } from '@/types/data';
import { PeopleAPI } from '@/types/people';

import { PeopleService } from '@/services/people';

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
    enabled: parseInt(id) >= 0
  });

  return {
    status: status,
    person: data
  };
};

export default usePerson;
