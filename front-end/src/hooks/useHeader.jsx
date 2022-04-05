import { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";
import { openModalSolicitud } from "../actions/modalActions";

const useStyles = makeStyles(
  (theme) => ({
    appbar: {
      zIndex: theme.zIndex.modal + 1,
    },
    logoContainer: {
      padding: 0,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    logo: {
      height: "6.5em",
      objectFit: "cover",
      [theme.breakpoints.down("md")]: {
        height: "5.5em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "4.5em",
      },
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: "2em",
      [theme.breakpoints.down("md")]: {
        marginBottom: "1em",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "0.25em",
      },
    },
    containerLink: {
      marginLeft: "auto",
      display: "flex",
      flexDirection: "row",
      gap: "3em",
      alignItems: "center",
      marginRight: "1em",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.common.white,
      fontFamily: "roboto",
      fontSize: "15px",

      "&:hover": {
        color: theme.palette.common.white.light,
        borderBottom: "1px solid #FFBA60",
      },
    },
    drawer: {
      backgroundColor: theme.palette.common.yellow,
      zIndex: 100,
    },
    drawerIcon: {
      marginLeft: "auto",
    },
    menu: {
      backgroundColor: theme.palette.common.yellow,
      color: "#ffffff",
      borderRadius: "0px",
    },

    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      textDecoration: "none",

      fontFamily: "roboto",
      "&:hover": {
        opacity: 1,
      },
    },
    drawerItemSelected: {
      opacity: 1,
    },
  }),
  { index: 1 }
);
export const useHeader = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCharge, setAnchorElCharge] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const {
    userInfo: { usuario },
  } = useSelector((state) => state.userLogin);

  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUserMenu(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUserMenu(null);
  }, []);

  const openUser = Boolean(anchorElUser);
  const openCharge = Boolean(anchorElCharge);

  const handleClickUser = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleClickCharge = useCallback((event) => {
    setAnchorElCharge(event.currentTarget);
  }, []);

  const handleCloseUser = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleCloseCharge = useCallback(() => {
    setAnchorElCharge(null);
  }, []);

  let activeStyle = {
    textDecoration: "underline",
  };

  const [routes, setRoutes] = useState([]);
  const [subRoutes, setSubRoutes] = useState([]);
  const handleLogout = useCallback(() => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/");
  }, [dispatch, navigate, handleCloseUserMenu]);

  const navigatePassword = useCallback(() => {
    navigate("/user/password");
  }, [navigate]);

  useEffect(() => {
    usuario.routes && setRoutes(usuario.routes);
    if (usuario.routes.filter((route) => route.subLink !== undefined)) {
      setSubRoutes(
        usuario.routes.filter((route) => route.subLink !== undefined)
      );
    }
  }, [usuario]);

  const openModal = useCallback(() => {
    dispatch(openModalSolicitud());
  }, [dispatch]);
  
  return {
    classes,
    openDrawer,
    setOpenDrawer,
    matches,
    anchorElUserMenu,
    handleOpenUserMenu,
    openUser,
    routes,
    openCharge,
    handleClickUser,
    handleClickCharge,
    handleCloseUser,
    subRoutes,
    handleCloseCharge,
    handleLogout,
    activeStyle,
    navigatePassword,
    openModal,
    usuario,
    navigate,
    handleCloseUserMenu,
    anchorElUser,
    anchorElCharge,
    theme,
  };
};
