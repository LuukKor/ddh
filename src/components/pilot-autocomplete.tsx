
import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { PeopleService } from "@/services/people";

import { People } from '@/types/people';
import { useQuery } from '@tanstack/react-query';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

const PilotAutocomplete = ({ setValueMethod }: { setValueMethod: UseFormSetValue<FieldValues> }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<People[]>([]);
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
  }, [isOpen, data, status, page, allOptionsDownloaded])

  return (

    <Autocomplete
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onChange={(event, option) => setValueMethod('pilot', option as { name: string; url: string; })}
      isOptionEqualToValue={(option: People, value: People) => option.name === value.name}
      getOptionLabel={(option: People) => option.name}
      options={options}
      loading={isLoading}
      defaultValue={options[0]}
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
      )}
    />
  );
};

export default PilotAutocomplete;
