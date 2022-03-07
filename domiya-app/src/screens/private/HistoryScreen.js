import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ComponentLoading from "../../components/utils/ComponentLoading";
import { listPedidos } from "../../actions/historyActions";
import StatusBarCustom from "../../components/StatusBarCustom";
import colors from "../../styles/colors";
import FlatListPedido from "../../components/Home/FlatListPedido";

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const { pedidos, loading } = useSelector((state) => state.history);
  useEffect(() => {
    dispatch(listPedidos());
  }, [dispatch]);
  if (loading) return <ComponentLoading />;
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {(pedidos && pedidos.length > 0) ? (
        <FlatListPedido history={true} pedidos={pedidos} title="Historial de Pedidos" />
      ) : (
        <ComponentLoading text="No tienes pedidos" />
      )}
    </>
  );
};

export default HistoryScreen;
