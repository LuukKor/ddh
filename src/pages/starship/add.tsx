import Layout from "@/components/layout";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function PersonPage() {
  const { back } = useRouter()

  return (
    <Layout>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        my={4}
      >
        <Button onClick={back} variant="contained">Go back</Button>
        dzien dorby
      </Stack>
    </Layout >
  );
}
