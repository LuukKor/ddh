
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material';

import { People } from '@/types/people';

import { PeopleService } from "@/services/people";

interface IPilotAutocomplete {
  setValueMethod: UseFormSetValue<FieldValues>,
  value: People
}

const PilotAutocomplete = ({ setValueMethod, value }: IPilotAutocomplete): JSX.Element => {
  const [options, setOptions] = useState<readonly People[]>([]);
  const [textFieldValue, setTextFieldValue] = useState('');
  const peopleService = new PeopleService();
  const { data, status, isLoading } = useQuery({
    queryKey: ['pilots', textFieldValue],
    queryFn: () => peopleService.serachByName(textFieldValue),
    enabled: !!textFieldValue
  });

  const handleSearch = useMemo(() => debounce(textFieldChange, 300), [])

  function textFieldChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setTextFieldValue(value)
  }


  useEffect(() => {
    if (data?.results && status === 'success') {
      setOptions(data.results);
    }
  }, [data, status])


  return (

    <Autocomplete
      onChange={(_, option) => setValueMethod('pilot', option)}
      isOptionEqualToValue={(option: People, value: People) => option.name === value.name}
      getOptionLabel={(option: People) => option.name}
      options={options}
      loading={isLoading}
      value={value?.name === '' ? null : value}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pilot"
          onChange={handleSearch}
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
