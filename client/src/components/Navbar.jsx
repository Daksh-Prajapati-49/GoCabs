import React, { useContext } from 'react';
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
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/AuthContext";

import { Link } from 'react-router-dom';

const pages = ['Users', 'Cabs', 'Paths', 'Bookings'];
const settings = ['Profile', 'My Boookings', 'Logout'];

function Navbar() {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    // useEffect(()=>{
    //     if(!user){
    //         navigate('/login');
    //     }
    // })

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

    const handleLogout = () => {
        // console.log("------------------")
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() - 1);

        // Create a cookie string with an expired date
        const cookieString = `access_token=; expires=${expirationDate.toUTCString()}; path=/`;

        // Set the cookie to delete it
        document.cookie = cookieString;
        dispatch({ type: "LOGOUT" });
        navigate('/login');
    }
    if (!user) {
        return <></>;
    }
    else {
        settings[0] = user.mail;
    }



    return (
        <AppBar position="static" style={{ backgroundColor: "black" }}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters>
                    <DirectionsCarFilledIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
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
                        <Link to="/" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}>
                            GoCabs
                        </Link>
                    </Typography>
                    {user.isAdmin ? (
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
                                {(user.isAdmin) ? (pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={`/admin/${page.toLowerCase()}`} style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}>
                                            <Typography textAlign="center">
                                                {page}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))) : ("")}
                            </Menu>
                        </Box>) : ("")
                    }
                    <DirectionsCarFilledIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        <Link to="/" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}>
                            GoCabs
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {(user.isAdmin) ? (pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={`/admin/${page.toLowerCase()}`} style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}>
                                    {page}
                                </Link>
                            </Button>
                        ))) : ("")}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                            <MenuItem key={settings[0]} onClick={handleCloseUserMenu}>
                                <div style={{ fontWeight: "500" }}>{settings[0]}</div>
                            </MenuItem>
                            <MenuItem key={settings[1]} onClick={handleCloseUserMenu}>
                                <Link to={'/myBookings'} fullWidth textAlign="center" style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}>{settings[1]}</Link>
                            </MenuItem>
                            <MenuItem key={settings[2]} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={handleLogout}>
                                    {settings[2]}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;