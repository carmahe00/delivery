import React, { useEffect, useState } from 'react'
import { AppBar, Button, CssBaseline, IconButton, List, ListItem, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, useMediaQuery } from '@mui/material'
import { makeStyles, useTheme } from '@mui/styles';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Menu as MenuIcon } from '@mui/icons-material';
import { openModalSolicitud } from '../../actions/modalActions';

const useStyles = makeStyles(theme => ({
    appbar: {
        zIndex: theme.zIndex.modal + 1
    },
    logoContainer: {
        padding: 0,
        marginRight: 'auto',
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    logo: {
        height: "6.5em",
        [theme.breakpoints.down("md")]: {
            height: "5.5em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "4.5em"
        }
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "2em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "1em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "0.25em",
        }
    },
    containerLink: {
        marginLeft: 'auto'
    },
    link: {
        textDecoration: "none",
        color: theme.palette.common.coffe,
        fontFamily: "Yellowtail",
        fontSize: "25px",
        marginLeft: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(5),
        },
        "&:hover": {
            color: theme.palette.secondary.light,
            borderBottom: "1px solid #FFBA60",
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.primary
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },

    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        textDecoration: "none",
        color: theme.palette.common.coffe,
        fontFamily: "Yellowtail",
        "&:hover": {
            opacity: 1
        }
    }
}))



const Header = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElCharge, setAnchorElCharge] = useState(null);

    const [openDrawer, setOpenDrawer] = useState(false)
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const { userInfo: { usuario } } = useSelector(state => state.userLogin)

    const openUser = Boolean(anchorElUser);
    const openCharge = Boolean(anchorElCharge);

    const handleClickUser = (event) => {

        setAnchorElUser(event.currentTarget);
    };
    const handleClickCharge = (event) => {

        setAnchorElCharge(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleCloseCharge = () => {
        setAnchorElCharge(null);
    };

    let activeStyle = {
        textDecoration: "underline",

    };

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }
    const [routes, setRoutes] = useState([])
    const [subRoutes, setSubRoutes] = useState([]);


    useEffect(() => {
        usuario.routes && setRoutes(usuario.routes)
        if (usuario.routes.filter(route => route.subLink !== undefined)) {
            setSubRoutes(usuario.routes.filter(route => route.subLink !== undefined))
        }


    }, [usuario, setRoutes])

    const openModal = () => {
        dispatch(openModalSolicitud())
    }


    const drawer = (
        <>
            <SwipeableDrawer

                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {
                        [...routes].map((route, index) => (
                            <ListItem
                                key={`${route.name}${index}`}
                                divider={index === 0}
                                button
                                classes={{ selected: classes.drawerItemSelected }}
                                onClick={() => setOpenDrawer(false)}
                            >
                                <NavLink to={route.link} className={classes.link}
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >
                                    {route.name}
                                </NavLink>
                            </ListItem>
                        ))
                    }
                    <ListItem
                        onClick={handleLogout}
                        divider
                        button
                        classes={{ selected: classes.drawerItemSelected }}
                    >
                        <ListItemText classes={{ root: classes.link }} disableTypography  >Salir</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple
                sx={{
                    marginLeft: "auto",
                    "&:hover": {
                        backgroundColor: "transparent"
                    }
                }} >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </>
    )

    const tabs = (
        <>
            <div className={classes.containerLink} >
                {
                    routes.map((route, index) => (
                        <NavLink to={route.link} key={`${route.name}${index}`} className={classes.link}
                            id={route.ariaOwns}
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            aria-expanded={openUser ? "true" : openCharge ? "true" : undefined}
                            onMouseOver={route.name === "Usuarios" ? handleClickUser : route.name === "Recargas" ? handleClickCharge : undefined}
                            aria-haspopup={route.ariaPopup}
                            aria-controls={openUser ? route.ariaOwns : openCharge ? route.ariaOwns : undefined}
                            onClick={() => navigate(route.link)}
                        >
                            {route.name}
                        </NavLink>

                    ))

                }
                {
                    usuario.rol === "PROVEEDORES" &&
                    <Button
                        style={{
                            textDecoration: "none",
                            fontFamily: "Yellowtail",
                            marginLeft: theme.spacing(5),
                            [theme.breakpoints.down("md")]: {
                                marginLeft: theme.spacing(5),
                            },
                            "&:hover": {
                                color: theme.palette.secondary.light,
                                borderBottom: "1px solid #FFBA60",
                            }
                        }}
                        color="secondary"
                        onClick={openModal}
                    >
                        Soliciitar
                    </Button>
                }
            </div>
            {
                subRoutes.map((route, index) => (
                    <Menu
                        id={route.ariaOwns}
                        key={index}
                        open={route.name === "Usuarios" ? openUser : route.name === "Recargas" ? openCharge : false}
                        onClose={route.name === "Usuarios" ? handleCloseUser : handleCloseCharge}
                        elevation={0}
                        keepMounted
                        style={{ zIndex: 1302 }}
                        MenuListProps={{
                            'aria-labelledby': route.ariaOwns,
                            onMouseLeave: route.name === "Usuarios" ? handleCloseUser : handleCloseCharge
                        }}
                        classes={{ paper: classes.menu }}
                        anchorEl={route.name === "Usuarios" ? anchorElUser : route.name === "Recargas" ? anchorElCharge : undefined}
                    >

                        {
                            route.subLink.map((sub, i) => (
                                <MenuItem
                                    key={`${i}-${sub.name}`}
                                    to={sub.link}
                                    onClick={() => navigate(sub.link)}
                                    classes={{ root: classes.menuItem }}
                                >
                                    {sub.name}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                ))
            }
        </>
    )

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appbar} style={{ backgroundColor: theme.palette.common.yellow }} >
                <Toolbar disableGutters >
                    <Button className={classes.logoContainer} disableRipple >
                        <img alt="Flexi" src="/images/trolley.png" className={classes.logo} />
                    </Button>
                    {matches ? drawer : tabs}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />

        </>
    )
}

export default Header
