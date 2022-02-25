import types from "../types/messagesType";

export const openMessage = (data) => ({ type: types.messageRecived, payload: data });
export const closeMessage = () => ({ type: types.messageClose });
