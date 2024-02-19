import Layout from "@/components/layout";
import Person from "@/components/person";
import usePerson from "@/hooks/usePerson";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function PersonPage() {
  const { query, back } = useRouter()
  const { person, status, getDataByUrl } = usePerson(query.name as string)

  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <Button onClick={back} variant="contained">Go back</Button>
        {status === 'success' && person ? (
          <Person person={person} getDataByUrl={getDataByUrl} />
        ) : (
          <Box p={4}>
            <CircularProgress />
          </Box>
        )
        }
      </Stack>
    </Layout >
  );
}
