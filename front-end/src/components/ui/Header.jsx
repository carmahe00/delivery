import React, { useMemo, useState } from 'react'
import { AppBar, Button, CssBaseline, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery } from '@mui/material'
import { makeStyles, useTheme } from '@mui/styles';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Menu as MenuIcon } from '@mui/icons-material';

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
    }

}))



const Header = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false)
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    let activeStyle = {
        textDecoration: "underline",

    };
    const routes = useMemo(() => [
        { name: "Home", link: "/user/home" },
        { name: "Predios", link: "/user/predios" },
        { name: "Vehiculos", link: "/user/vehiculos" },
        { name: "Pagos", link: "/user/pagos" },
    ], [])

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
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
                        routes.map((route, index) => (
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
        <div className={classes.containerLink} >
            {
                routes.map((route, index) => (
                    <NavLink to={route.link} key={`${route.name}${index}`} className={classes.link}
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        {route.name}
                    </NavLink>
                ))
            }
        </div>
    )

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appbar} >
                <Toolbar>
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
