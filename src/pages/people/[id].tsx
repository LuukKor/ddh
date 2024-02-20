import BackButton from "@/components/back-button";
import Layout from "@/components/layout";
import Person from "@/components/person";
import usePerson from "@/hooks/usePerson";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function PersonPage() {
  const { query } = useRouter()
  const { person, status, getDataByUrl } = usePerson(query.id as string)

  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <BackButton />
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
