import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import types from "../types/socketType";

export const useSocket = (serverPath) => {
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  const socket = useMemo(() => {
    const socketTmp =
      userInfo &&
      io(serverPath, {
        extraHeaders: {
          authorization: JSON.stringify(userInfo),
        },
      });
    return socketTmp;
  }, [serverPath, userInfo]);

  const online = useMemo(() => socket?.connected, [socket]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () =>
      dispatch({
        type: types.userConnect,
      })
    );
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("disconnect", () =>
      dispatch({
        type: types.userDisconnet,
      })
    );
  }, [socket, dispatch]);

  return {
    socket,
    online,
    desconectarSocket,
  };
};
