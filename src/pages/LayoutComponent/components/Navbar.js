import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Link, NavLink } from 'react-router-dom';
import fireBaseAuth from '../../../utils/fireBaseAuth';
import { useSelector } from 'react-redux';





const pages = [{ name: 'Tool-o-Pedia', path: '/wiki' }, { name: 'Toolbox', path: '/toolbox' }];
const settings = [{ name: 'Profile', path: '/profile' }, { name: 'Logout', path: fireBaseAuth.signUserOut }];
const loginSettings = [{ name: 'Login', path: '/login' }, { name: 'Signup', path: '/register' },]

function Navbar() {

    const user = useSelector((state) => state.auth)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HandymanIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <NavLink to={'/'}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HANDY DANDY
                        </Typography>
                    </NavLink>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <NavLink key={page.name} to={page.path}>
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" color={'black'}>{page.name}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                            {user.userExtras && user.userExtras.isAdmin ? <NavLink to={'/admin'}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" color={'black'}>{'Admin'}</Typography>
                                </MenuItem>
                            </NavLink> : null}
                        </Menu>
                    </Box>
                    <HandymanIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HANDY DANDY
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink key={page.name} to={page.path}>
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </NavLink>
                        ))}
                        {user.userExtras && user.userExtras.isAdmin ? <NavLink to={'/admin'}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {'Admin'}
                            </Button>
                        </NavLink> : null}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.user && user.user.displayName} src={user.user && user.user.photoURL ? user.user.photoURL : '/'} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!user.user ? loginSettings.map((setting) => (
                                <Link key={setting.name} to={setting.path === fireBaseAuth.signUserOut ? null : setting.path}>
                                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" color={'black'}>{setting.name}</Typography>
                                    </MenuItem>
                                </Link>
                            )) : settings.map((setting) => (
                                <Link key={setting.name} to={setting.path}>
                                    <MenuItem key={setting.name} onClick={(e) => {
                                        if (setting.path === fireBaseAuth.signUserOut) {
                                            fireBaseAuth.signUserOut()
                                            handleCloseUserMenu()
                                        } else {
                                            handleCloseUserMenu()
                                        }


                                    }}>
                                        <Typography textAlign="center" color={'black'}>{setting.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;