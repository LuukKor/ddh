import Layout from "@/components/layout";
import { PeopleService } from "@/services/people";
import { People } from "@/types/people";
import { fetcher } from "@/utils/fetcher";
import { Autocomplete, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function PersonPage() {
  const { back } = useRouter()
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<People[]>([]);
  const [allOptionsDownloaded, setAllOptionsDownloaded] = useState(false);
  const peopleService = new PeopleService();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      model: '',
      name: '',
      pilot: {
        name: '',
        url: '',
      },
      starship_class: '',
      cost_in_credits: 0,
      length: '',
      max_atmosphering_speed: '',
    }
  })

  const { data, status, isLoading } = useQuery({
    queryKey: ['pilots', page],
    queryFn: () => peopleService.getPage(page),
    enabled: !allOptionsDownloaded && isOpen
  });

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

  function onOpen() {
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
    fetcher('/api/starship', 'POST', data).then((res) => console.log(res)).catch(err => console.error(err))
  }
  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <Button onClick={back} variant="contained">Go back</Button>
        <Box>
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              fullWidth
              defaultValue=""
              {...register("name")}
              label={"Name"}
            />
            <TextField
              fullWidth
              defaultValue=""
              {...register("model")}
              label={"Model"}
            />
          </Stack>
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              fullWidth
              type="number"
              defaultValue={0}
              {...register("cost_in_credits")}
              label={"Cost in credits"}
            />
            <TextField
              fullWidth
              defaultValue=""
              {...register("length")}
              label={"Length"}
            />
          </Stack>
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              defaultValue=""
              {...register("max_atmosphering_speed")}
              label={"Max atmosphering speed"}
            />
            <Autocomplete
              open={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              onChange={(event, option) => setValue('pilot', option as { name: string; url: string; })}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option: People, value: People) => option.name === value.name}
              getOptionLabel={(option: People) => option.name}
              options={options}
              loading={isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pilot"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Starship class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Starship class"
              defaultValue=""
              {...register("starship_class")}
            >
              <MenuItem value={'Starfighter'}>Starfighter</MenuItem>
              <MenuItem value={'Deep Space Mobile Battlestation'}>Deep Space Mobile Battlestation</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={handleSubmit((data: FieldValues) => onSubmit(data))}>Submit</Button>
      </Stack>
    </Layout >
  );
}
