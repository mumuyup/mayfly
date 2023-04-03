import * as React from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import {useLayoutConfig, useToggleSider} from '../store/layout';
import {Outlet} from 'react-router-dom';
import {ThemeButton} from './components/ThemeButton';
import {Logo} from './components/Logo';
import { UserMenu } from './components/UserMenu';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default function LayoutDrawer() {
  const theme = useTheme();

  const layoutConfig = useLayoutConfig();
  const toggleLayout = useToggleSider();
  const handleDrawerOpen = () => {
    toggleLayout();
  };

  const handleDrawerClose = () => {
    toggleLayout();
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={layoutConfig?.openSider}>
        <Toolbar>
          <Logo />
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{flexGrow: 1, paddingLeft: '10px'}}
          >
            MF-UI
          </Typography>
          <UserMenu />
          <ThemeButton sx={{mr: 1}} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={layoutConfig?.openSider}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: layoutConfig?.openSider
                    ? 'initial'
                    : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: layoutConfig?.openSider ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{opacity: layoutConfig?.openSider ? 1 : 0}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: layoutConfig?.openSider
                    ? 'initial'
                    : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: layoutConfig?.openSider ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{opacity: layoutConfig?.openSider ? 1 : 0}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader />
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Box>
    </Box>
  );
}
