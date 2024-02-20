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
  ListItemText,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';

interface IPage {
  name: string
  url: string
  childrens?: IPage[]
}

const drawerWidth = 240;

function Sidebar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [collapseIsOpen, setCollapseIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const { pathname } = useRouter();

  const handleClickWithChildrens = () => {
    setCollapseIsOpen(!collapseIsOpen);
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

  const isGreaterThanMediumBreakpoint = useMediaQuery(
    theme.breakpoints.up("md")
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
        display: { xs: 'flex', md: 'none' },
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
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isGreaterThanMediumBreakpoint ? "permanent" : "temporary"}
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
          <Toolbar
            disableGutters={true}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              padding: 2
            }}
          >
            <Typography variant="button" display='block' margin='0' fontSize={24}>
              DDH
            </Typography>
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
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
                    return <Stack key={childPage.url} sx={{ width: '100%' }}>
                      <ListItemButton onClick={handleClickWithChildrens}>
                        <ListItemText primary={page.name} />
                        <KeyboardArrowDownIcon />
                      </ListItemButton>
                      <Collapse in={collapseIsOpen} timeout="auto" unmountOnExit>
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
                    backgroundColor: pathname === page.url || pathname.includes('/people/') ? theme.palette.primary.main : 'inherit',
                    color: pathname === page.url || pathname.includes('/people/') ? theme.palette.primary.contrastText : 'inherit',
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
