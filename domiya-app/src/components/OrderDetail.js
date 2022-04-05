import React, { useCallback, useContext } from "react";
import { Card, Avatar, Paragraph, Button } from "react-native-paper";
import { API } from "@env";
import { ScrollView, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { openMessage } from "../actions/messageActions";
import ComponentLoading from "./utils/ComponentLoading";
import stylesForm from "../styles/form";
import { SocketContext } from "../context/SocketProvider";
import { addProductOrder } from "../actions/storeActions";
import { useMounted } from "../hooks/useMounted";

const LeftContent = (name, props) => <Avatar.Icon {...props} icon={name} />;

const OrderDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isVisible } = useMounted();
  const { socket } = useContext(SocketContext);
  const { pedido, success } = useSelector((state) => state.pedidosConnect);
  if (Object.entries(pedido).length === 0) {
    navigation.navigate("home", { screen: "main" });
    dispatch(openMessage("No se le ha asignado el pedido"));
  }

  const navigateToRoad = () => {
    navigation.navigate("home", { screen: "road" });
  };

  const sendRecoger = async () => {
    socket?.emit("domicilio:encamino", pedido, navigateToRoad);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await addProductOrder(
          pedido.id_pedido,
          pedido?.proveedor.nombre,
          pedido.nombre,
          pedido.fecha_hora,
          pedido.estado
        );
      })();
    }, [])
  );

  if (!success) return <ComponentLoading />;

  return (
    <>
      {isVisible && (
        <ScrollView>
          <Card>
            <Card.Cover source={{ uri: `${API}${pedido?.proveedor.imagen}` }} />
            <Card.Title
              title={pedido?.proveedor.nombre}
              subtitle={pedido?.proveedor.celular}
              left={(props) => LeftContent("domain", props)}
            />
            <Card.Title
              title={pedido.nombre}
              left={(props) => LeftContent("account", props)}
            />
            <Card.Title
              title={pedido.celular}
              left={(props) => LeftContent("phone", props)}
            />
            <Card.Title
              title="Valor Domicilio"
              subtitle={pedido.valor_domicilio}
              left={(props) => LeftContent("currency-usd", props)}
            />
            <Card.Title
              title="Valor Pedido"
              subtitle={pedido.valor_pedido}
              left={(props) => LeftContent("currency-usd", props)}
            />
            <Card.Title
              title="Valor Seguro"
              subtitle={pedido.valor_seguro}
              left={(props) => LeftContent("book-lock", props)}
            />
            <Card.Title
              title={pedido.celular}
              left={(props) => LeftContent("phone", props)}
            />
            <Card.Title
              title="Recoger en:"
              subtitle={pedido.recoger}
              left={(props) => LeftContent("map-marker", props)}
            />
            <Card.Title
              title="Entregar en:"
              subtitle={pedido.entregar}
              left={(props) => LeftContent("map-marker", props)}
            />
            <Card.Title
              title="Forma de pago"
              subtitle={pedido.forma_pago}
              left={(props) => LeftContent("handshake", props)}
            />
            <Card.Title
              title="Asegurado"
              left={(props) =>
                LeftContent(
                  pedido?.asegurar ? "check-bold" : "alpha-x-circle",
                  props
                )
              }
            />
            <Card.Title
              title="Evidencia"
              left={(props) =>
                LeftContent(
                  pedido?.evidencia ? "check-bold" : "alpha-x-circle",
                  props
                )
              }
            />
            <Card.Content>
              <Paragraph>{pedido?.descripcion}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                style={stylesForm.btnSuccess}
                icon="send"
                onPress={sendRecoger}
              >
                <Text style={stylesForm.textSuccess}>Recoger</Text>
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      )}
    </>
  );
};

export default OrderDetail;
