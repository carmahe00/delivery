import React from "react";
import { Collapse, Alert, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import ModalSolicitud from "../components/ModalSolicitud";
import { SocketProvider } from "../context/SocketProvider";
import { pedidosCLOSE } from "../actions/pedidosActions";

const ProtectedRouterProv = ({ isAuthenticated, roles }) => {
  const location = useLocation();
  const { isError, error } = useSelector((state) => state.pedidosConnect);
  const dispatch = useDispatch();

  return isAuthenticated ? (
    <SocketProvider>
      <Header />
      <div style={{ position: "relative", height: "100vh" }}>
        <Collapse in={isError}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(pedidosCLOSE());
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
        <Outlet />

        <ModalSolicitud />
        <Footer />
      </div>
    </SocketProvider>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default ProtectedRouterProv;
