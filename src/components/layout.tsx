import { ReactNode } from 'react';

import { Container, Stack } from '@mui/material';
import Sidebar from './sidebar';

type PropsWithChildren = { children?: ReactNode };

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <Stack direction={'row'}>
        <Sidebar />
        <Stack component="main" width={'100%'}>{children}</Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
