import { ReactNode } from 'react';

import { Container, Stack, useMediaQuery } from '@mui/material';

import theme from '@/theme';

import Sidebar from './sidebar';

type PropsWithChildren = { children?: ReactNode };

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  const isGreaterThanMediumBreakpoint = useMediaQuery(
    theme.breakpoints.up("md")
  );

  return (
    <Stack direction={isGreaterThanMediumBreakpoint ? 'row' : 'column'}>
      <Sidebar />
      <Container maxWidth="lg">
        <Stack component="main" width={'100%'}>{children}</Stack>
      </Container>
    </Stack>
  );
};

export default Layout;
