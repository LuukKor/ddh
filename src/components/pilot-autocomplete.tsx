
import { useEffect, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { People } from '@/types/people';

import { PeopleService } from "@/services/people";

interface IPilotAutocomplete {
  setValueMethod: UseFormSetValue<FieldValues>,
  value: People
}

const PilotAutocomplete = ({ setValueMethod, value }: IPilotAutocomplete): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<readonly People[]>([{
    name: ''
  }]);
  const [page, setPage] = useState(1);
  const [allOptionsDownloaded, setAllOptionsDownloaded] = useState(false);
  const peopleService = new PeopleService();

  const { data, status, isLoading } = useQuery({
    queryKey: ['pilots', page],
    queryFn: () => peopleService.getPage(page),
    enabled: !allOptionsDownloaded && isOpen
  });

  function onOpen() {
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!allOptionsDownloaded && isOpen === true && status === 'success') {
      if (page < data.totalPage) {
        setPage(page + 1)
      } else {
        setAllOptionsDownloaded(true)
      }
      setOptions([...data.list, ...options])
    }
  }, [isOpen, data, status, page, allOptionsDownloaded, options])

  return (

    <Autocomplete
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onChange={(_, option) => setValueMethod('pilot', option)}
      isOptionEqualToValue={(option: People, value: People) => option.name === value.name}
      getOptionLabel={(option: People) => option.name}
      options={options}
      loading={isLoading}
      value={value}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pilot"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )
      }
    />
  );
};

export default PilotAutocomplete;
