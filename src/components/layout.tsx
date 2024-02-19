import { ReactNode } from 'react';

import { Container, Stack, useMediaQuery } from '@mui/material';
import Sidebar from './sidebar';
import theme from '@/theme';

type PropsWithChildren = { children?: ReactNode };

const Layout = ({ children }: PropsWithChildren): JSX.Element => {

  const isGreaterThanSmallBreakpoint = useMediaQuery(
    theme.breakpoints.up("sm")
  );

  return (
    <Stack direction={isGreaterThanSmallBreakpoint ? 'row' : 'column'}>
      <Sidebar />
      <Container maxWidth="lg">
        <Stack component="main" width={'100%'}>{children}</Stack>
      </Container>
    </Stack>
  );
};

export default Layout;
