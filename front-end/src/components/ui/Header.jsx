import React, { useEffect } from "react";

import {
  SwipeableDrawer,
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Menu as MenuIcon } from "@mui/icons-material";
import { useHeader } from "../../hooks/useHeader";
import { balanceUser } from "../../actions/userActions";

const baseUrl = process.env.REACT_APP_API_URL_BASE;
const Header = () => {
  const dispatch = useDispatch();
  const {
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
  } = useHeader();
  const { valor, loadingBalance } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(balanceUser());
  }, []);

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
          {[...routes].map((route, index) =>
            !route.subLink ? (
              <ListItem
                key={`${route.name}${index}`}
                divider={index === 0}
                button
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => setOpenDrawer(false)}
              >
                <NavLink
                  to={route.link}
                  className={classes.link}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {route.name}
                </NavLink>
              </ListItem>
            ) : (
              route.subLink.map((subLink, index) => (
                <ListItem
                  key={`${subLink.name}${index}`}
                  button
                  classes={{ selected: classes.drawerItemSelected }}
                  onClick={() => setOpenDrawer(false)}
                >
                  <NavLink
                    to={subLink.link}
                    className={classes.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    {subLink.name}
                  </NavLink>
                </ListItem>
              ))
            )
          )}
          {usuario.rol === "PROVEEDORES" && (
            <ListItem
              onClick={openModal}
              divider
              button
              classes={{ selected: classes.drawerItemSelected }}
            >
              <ListItemText classes={{ root: classes.link }} disableTypography>
                Solicitar+
              </ListItemText>
            </ListItem>
          )}
          <ListItem
            onClick={navigatePassword}
            button
            classes={{ selected: classes.drawerItemSelected }}
          >
            <ListItemText classes={{ root: classes.link }} disableTypography>
              Contraseña
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={handleLogout}
            button
            classes={{ selected: classes.drawerItemSelected }}
          >
            <ListItemText classes={{ root: classes.link }} disableTypography>
              Salir
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        classes={{ root: classes.drawerIcon }}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );

  const tabs = (
    <>
      <div className={classes.containerLink}>
        {routes.map((route, index) => (
          <NavLink
            to={route.link}
            key={`${route.name}${index}`}
            className={classes.link}
            id={route.ariaOwns}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            aria-expanded={openUser ? "true" : openCharge ? "true" : undefined}
            onMouseOver={
              route.name === "Usuarios"
                ? handleClickUser
                : route.name === "Recargas"
                ? handleClickCharge
                : undefined
            }
            aria-haspopup={route.ariaPopup}
            aria-controls={
              openUser
                ? route.ariaOwns
                : openCharge
                ? route.ariaOwns
                : undefined
            }
            onClick={() => navigate(route.link)}
          >
            {route.name}
          </NavLink>
        ))}
        {usuario.rol === "PROVEEDORES" && (
          <NavLink className={classes.link} to="#" onClick={openModal}>
            Solicitar+
          </NavLink>
        )}

        <Tooltip
          title="Abrir configuración"
          aria-owns="menu-appbar"
          aria-haspopup={true}
        >
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={
                usuario.imagen
                  ? `${baseUrl}${usuario.imagen}`
                  : "/images/user.png"
              }
            />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUserMenu}
          open={Boolean(anchorElUserMenu)}
          onClose={handleCloseUserMenu}
          MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
          elevation={0}
          style={{ zIndex: 1302 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Typography>{usuario.email}</Typography>
          </MenuItem>
          <MenuItem onClick={navigatePassword}>
            <Typography>Contraseña</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>Salir</Typography>
          </MenuItem>
        </Menu>

        {/* <NavLink className={classes.link} to="#" onClick={handleLogout}>
          Salir
        </NavLink> */}
      </div>
      {subRoutes.map((route, index) => (
        <Menu
          id={route.ariaOwns}
          key={index}
          open={
            route.name === "Usuarios"
              ? openUser
              : route.name === "Recargas"
              ? openCharge
              : false
          }
          onClose={
            route.name === "Usuarios" ? handleCloseUser : handleCloseCharge
          }
          elevation={0}
          keepMounted
          style={{ zIndex: 1302 }}
          MenuListProps={{
            "aria-labelledby": route.ariaOwns,
            onMouseLeave:
              route.name === "Usuarios" ? handleCloseUser : handleCloseCharge,
          }}
          classes={{ paper: classes.menu }}
          anchorEl={
            route.name === "Usuarios"
              ? anchorElUser
              : route.name === "Recargas"
              ? anchorElCharge
              : undefined
          }
        >
          {route.subLink.map((sub, i) => (
            <MenuItem
              key={`${i}-${sub.name}`}
              to={sub.link}
              onClick={() => navigate(sub.link)}
              classes={{ root: classes.menuItem }}
            >
              {sub.name}
            </MenuItem>
          ))}
          {usuario.rol === "PROVEEDORES" && (
            <MenuItem
              to="#"
              onClick={openModal}
              classes={{ root: classes.menuItem }}
            >
              Solicitar+
            </MenuItem>
          )}
        </Menu>
      ))}
    </>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appbar}
        style={{ backgroundColor: theme.palette.common.yellow }}
      >
        <Toolbar disableGutters>
          <Button
            sx={{ padding: "0" }}
            onClick={() => navigate("/user/home")}
            className={classes.logoContainer}
            disableRipple
          >
            <img
              alt="Flexi"
              src="/images/trolley.png"
              className={classes.logo}
            />
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>USUARIO: {usuario.nombre}</Typography>
            {loadingBalance ? (
              <CircularProgress
                style={{
                  display: "block",
                }}
                color="secondary"
              />
            ) : (
              valor && <Typography>SALDO: {valor.saldo}</Typography>
            )}
          </Box>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
