import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

import { fetcher } from "@/utils/fetcher";
import { removeUnderscore, uppercaseFirstLetter } from "@/utils/string";

import BackButton from "@/components/back-button";
import Layout from "@/components/layout";
import PilotAutocomplete from "@/components/pilot-autocomplete";

import theme from "@/theme";

import { StarshipDTO } from "../api/starship";

interface IAPIErrors {
  formErrors: object[],
  fieldErrors: object
}

export default function PersonPage() {
  const defaultValues: StarshipDTO = {
    name: '',
    model: '',
    cost_in_credits: 0,
    length: '',
    max_atmosphering_speed: '',
    pilot: { name: '', url: '' },
    starship_class: 'Starfighter'
  }
  const [errors, setErrors] = useState<IAPIErrors | object>({});
  const { register, handleSubmit, setValue, watch, reset } = useForm()

  const onSubmit = (data: FieldValues) => {
    fetcher('/api/starship', 'POST', data).then((res) => {
      const response: { formErrors: object[], fieldErrors: object } = res as { formErrors: object[], fieldErrors: object };

      if (response?.fieldErrors) {
        setErrors(response.fieldErrors)
      } else if (errors) {
        setErrors({})
      }

      if (Object.keys(res as object).length === 0) {
        alert('Starship added')
        reset(defaultValues)
        // setValue('starship_class', '')
      }
    })
  }

  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <BackButton />
        <Typography variant="h3">Add new starship</Typography>
        <Box width={'100%'} maxWidth={600}>
          {errors && (
            <Box mb={1}>
              {Object.entries(errors).map((error) => {
                const field = uppercaseFirstLetter(removeUnderscore(error[0]))
                const errorMessage = error[1]
                return <Box key={error[0]} padding={1} color={theme.palette.error.main}>
                  <><b>{field}</b>: {errorMessage}</>
                </Box>
              })}
            </Box>
          )}
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              fullWidth
              defaultValue={defaultValues.name}
              {...register("name")}
              label={"Name"}
            />
            <TextField
              fullWidth
              defaultValue={defaultValues.model}
              {...register("model")}
              label={"Model"}
            />
          </Stack>
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              fullWidth
              type="number"
              defaultValue={defaultValues.cost_in_credits}
              {...register("cost_in_credits")}
              label={"Cost in credits"}
            />
            <TextField
              fullWidth
              defaultValue={defaultValues.length}
              {...register("length")}
              label={"Length"}
            />
          </Stack>
          <Stack direction='row' gap={2} mb={2}>
            <TextField
              fullWidth
              defaultValue={defaultValues.max_atmosphering_speed}
              {...register("max_atmosphering_speed")}
              label={"Max atmosphering speed"}
            />
            <PilotAutocomplete
              setValueMethod={setValue}
              value={watch('pilot') || defaultValues.pilot}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="startship_class_label">Starship class</InputLabel>
            <Select
              labelId="starship_class_label"
              label="Starship class"
              defaultValue={defaultValues.starship_class}
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
