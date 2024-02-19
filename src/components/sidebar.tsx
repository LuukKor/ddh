import { useState } from 'react';
import Link from 'next/link';

import theme from '@/theme';
import {
  useMediaQuery,
  Toolbar,
  ListItemButton,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Collapse,
  Stack,
  ListItemText
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface IPage {
  name: string
  url: string
  childrens?: IPage[]
}

const drawerWidth = 240;

function Sidebar(): JSX.Element {
  const [open, setOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const { pathname } = useRouter();

  const handleClickWithChildrens = () => {
    setOpen(!open);
  };
  const pages: IPage[] = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Starships',
      url: '',
      childrens: [
        {
          name: 'Add',
          url: '/starship/add',
        }
      ]
    }
  ]

  const isGreaterThanSmallBreakpoint = useMediaQuery(
    theme.breakpoints.up("sm")
  );

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpen(!open);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toolbar sx={{
        display: { xs: 'flex', sm: 'none' },
        marginLeft: 'auto'
      }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isGreaterThanSmallBreakpoint ? "permanent" : "temporary"}
          open={open}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Toolbar sx={{
            marginLeft: 'auto'
          }}>
            <IconButton
              sx={{
                display: { xs: 'flex', sm: 'none' },
              }}
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItem key={page.name} disablePadding>
                {page.childrens ? (
                  page.childrens.map(childPage => {
                    console.log(pathname)
                    return <Stack key={childPage.url} sx={{ width: '100%' }}>
                      <ListItemButton onClick={handleClickWithChildrens}>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <Link style={{
                            display: 'inline-block',
                            width: '100%',
                            textDecoration: 'none',
                            backgroundColor: pathname === childPage.url ? theme.palette.primary.main : 'inherit',
                            color: pathname === childPage.url ? theme.palette.primary.contrastText : 'inherit',
                          }} href={childPage.url}>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText>{childPage.name}</ListItemText>
                            </ListItemButton>
                          </Link>
                        </List>
                      </Collapse>
                    </Stack>
                  })
                ) : (
                  <Link style={{
                    width: '100%',
                    textDecoration: 'none',
                    backgroundColor: pathname === page.url ? theme.palette.primary.main : 'inherit',
                    color: pathname === page.url ? theme.palette.primary.contrastText : 'inherit',
                  }} href={page.url}>
                    <ListItemButton>
                      <ListItemText>
                        {page.name}
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box >
  );
}

export default Sidebar;
