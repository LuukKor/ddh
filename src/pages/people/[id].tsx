import { useRouter } from "next/router";

import { Box, CircularProgress, Stack } from "@mui/material";

import usePerson from "@/hooks/usePerson";

import BackButton from "@/components/back-button";
import Layout from "@/components/layout";
import Person from "@/components/person";

export default function PersonPage(): JSX.Element {
  const { query } = useRouter()
  const { person, status } = usePerson(query.id as string)

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
          <Person person={person} />
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
