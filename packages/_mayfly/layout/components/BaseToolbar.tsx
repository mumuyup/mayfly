import React from 'react';
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Toolbar,
  useTheme
} from '@mui/material';
import {Link} from '../../components/Link';
import {Logo} from './Logo';

export function BaseToolbar(props: AppBarProps): JSX.Element {
  const theme = useTheme();

  console.log(theme);

  return (
    <AppBar elevation={0} {...props}>
      <Toolbar>
        {/* Name / Logo */}
        <Box
          sx={{textDecoration: 'none', color: 'inherit'}}
          component={Link}
          children={<Logo />}
          href="/"
        />

        {/* Spacer */}
        <Box sx={{flexGrow: 1}} component="span" />

        {/* Close button */}
        <Button component={Link} href="/">
          关闭
        </Button>
      </Toolbar>
    </AppBar>
  );
}
