import Layout from "@/components/layout";
import usePerson from "@/hooks/usePerson";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

export default function Person() {
  const { query, back } = useRouter()
  const { person, status } = usePerson(query.name as string)

  console.log(person, status)

  return (
    <Layout>
      <Stack alignItems="center" justifyContent="center" my={4}>
        {status === 'success' && person ? (
          <div>
            <button onClick={() => back()}>prev</button>
            {person.name}
          </div>
        ) : (
          <Box p={4}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
    </Layout>
  );
}
