import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AppBarComponent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#164e63"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <img style={{borderRadius: "100%", height: "40px", width: "40px"}} src="data:image/png;base64,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" alt="ant_img"></img>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}