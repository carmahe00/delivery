import React, { useContext, useEffect } from "react";
import { Card, Avatar, Paragraph, Button } from "react-native-paper";
import { API } from "@env";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { openMessage } from "../actions/messageActions";
import ComponentLoading from "./utils/ComponentLoading";
import stylesForm from "../styles/form";
import { SocketContext } from "../context/SocketProvider";

const LeftContent = (name, props) => <Avatar.Icon {...props} icon={name} />;

const OrderDetail = () => {
  const navigation = useNavigation();
  const { pedido, success } = useSelector((state) => state.pedidosConnect);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  if (Object.entries(pedido).length === 0) {
    navigation.navigate("main");
    dispatch(openMessage("No se le ha asignado el pedido"));
  }

  const navigateToRoad = () => {
    navigation.navigate("road");
  };

  const sendRecoger = async () => {
    socket?.emit("domicilio:encamino", pedido, navigateToRoad);
  };

  useEffect(() => {
    switch (pedido.estado) {
      case "VA_RECOGER":
        return navigation.navigate("pedido");
      case "EN_CAMINO":
        return navigation.navigate("road");
      case "ENTREGADO":
        return navigation.navigate("wait");
      default:
        navigation.navigate("pedido");
        break;
    }
  }, [pedido, navigation]);
  if (!success) return <ComponentLoading />;
  
  return (
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
  );
};

export default OrderDetail;
