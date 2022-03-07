import { API } from "@env";
import { createContext } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSocket } from "../hooks/useSockets";
import { openMessage } from "../actions/messageActions";
import { pedidosRecive, pedidoRecive } from "../actions/pedidosActions";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, desconectarSocket } = useSocket(API);
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(userInfo);
  useEffect(() => {
    if (!userInfo.usuario) desconectarSocket();
  }, [userInfo, desconectarSocket]);

  useEffect(() => {
    socket?.on("lista-domicilios", (domicilios) => {
      dispatch(pedidosRecive(domicilios));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("domicilio:encamino", (domicilio) => {
      dispatch(pedidoRecive(domicilio));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("error-solicitud", (errorMessage) => {
      dispatch(openMessage(errorMessage));
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online, desconectarSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
