import { ReactNode } from 'react';

import { Container, Stack } from '@mui/material';

type PropsWithChildren = { children?: ReactNode };

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <Stack component="main">{children}</Stack>
    </Container>
  );
};

export default Layout;
