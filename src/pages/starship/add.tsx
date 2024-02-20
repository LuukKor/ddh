import Layout from "@/components/layout";
import { PeopleService } from "@/services/people";
import { People } from "@/types/people";
import { fetcher } from "@/utils/fetcher";
import { Autocomplete, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const { data, status, isLoading } = useQuery({
    queryKey: ['pilots', page],
    queryFn: () => peopleService.getPage(page),
    enabled: !allOptionsDownloaded && isOpen
  });

  useEffect(() => {
    if (isOpen === true && status === 'success') {
      if (page < data.totalPage) {
        setOptions([...data.list, ...options])
        setPage(page + 1)
      } else {
        setAllOptionsDownloaded(true)
      }
    }
  }, [isOpen, data, status, page])

  function onOpen() {
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)

    fetcher('https://swapi.dev/api/starships/', 'POST', {}).then(() => console.log('ok')).catch(err => console.log(err))

  }

  console.log(watch("example"))
  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <Button onClick={back} variant="contained">Go back</Button>
        <Stack direction='row' flexWrap='wrap'>
          <Autocomplete
            open={isOpen}
            onOpen={onOpen}
            onClose={onClose}
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
          <TextField
            defaultValue="test"
            {...register("example")}
            label={"Text Value"}
          />

          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={reset}>Reset</Button>
        </Stack>
      </Stack>
    </Layout >
  );
}
