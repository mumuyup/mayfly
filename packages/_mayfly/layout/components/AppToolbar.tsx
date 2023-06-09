import {
  AppBar,
  AppBarProps,
  Button,
  IconButton,
  Link,
  Toolbar
} from '@mui/material';
import {ArrowDropDown, NotificationsNone} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import {Link as NavLink} from '../../components/Link';
import {useCurrentUser} from '../../store/auth';
import {Logo} from './Logo';
import {NotificationsMenu} from './NotificationsMenu';
import {ThemeButton} from './ThemeButton';
import {UserMenu} from './UserMenu';
import {useLayoutConfig, useToggleSider} from '../../store/layout';

export function AppToolbar(props: AppToolbarProps): JSX.Element {
  const {sx, ...other} = props;
  const menuAnchorRef = React.createRef<HTMLButtonElement>();
  const toggleSider = useToggleSider();

  const layoutConfig = useLayoutConfig();

  const user = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState({
    userMenu: null as HTMLElement | null,
    notifications: null as HTMLElement | null
  });

  function openNotificationsMenu() {
    setAnchorEl((x) => ({...x, notifications: menuAnchorRef.current}));
  }

  function closeNotificationsMenu() {
    setAnchorEl((x) => ({...x, notifications: null}));
  }

  function openUserMenu() {
    setAnchorEl((x) => ({...x, userMenu: menuAnchorRef.current}));
  }

  function closeUserMenu() {
    setAnchorEl((x) => ({...x, userMenu: null}));
  }

  function handleDrawerOpen() {
    toggleSider();
  }

  return (
    <AppBar
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1, ...sx}}
      color="default"
      elevation={1}
      {...other}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(layoutConfig?.openSider && {display: 'none'})
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* App name / logo */}

        <Link color="inherit" underline="none" href="/" component={NavLink}>
          <Logo />
        </Link>

        <span style={{flexGrow: 1}} />

        {/* Account related controls (icon buttons) */}

        <ThemeButton sx={{mr: 1}} />

        {user && (
          <IconButton
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === 'light'
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40
            }}
            children={<NotificationsNone />}
            onClick={openNotificationsMenu}
          />
        )}

        {user && (
          <IconButton
            ref={menuAnchorRef}
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === 'light'
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40
            }}
            children={<ArrowDropDown />}
            onClick={openUserMenu}
          />
        )}
        {user === null && (
          <Button
            component={NavLink}
            variant="text"
            href="/login"
            color="inherit"
            children="Log in"
          />
        )}
        {user === null && (
          <Button
            component={NavLink}
            variant="outlined"
            href="/signup"
            color="inherit"
            children="Create an account"
          />
        )}
      </Toolbar>

      {/* Pop-up menus */}

      <NotificationsMenu
        anchorEl={anchorEl.notifications}
        onClose={closeNotificationsMenu}
        PaperProps={{sx: {marginTop: '8px'}}}
      />
      <UserMenu
        anchorEl={anchorEl.userMenu}
        onClose={closeUserMenu}
        PaperProps={{sx: {marginTop: '8px'}}}
      />
    </AppBar>
  );
}

function getFirstName(displayName: string): string {
  return displayName && displayName.split(' ')[0];
}

type AppToolbarProps = Omit<AppBarProps, 'children'>;
