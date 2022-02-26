import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Portal,
  Card,
  Provider,
  Title,
  Paragraph,
  Button,
  Text,
  Checkbox,
} from "react-native-paper";

import { closeModal } from "../../actions/modalActions";
import { SocketContext } from "../../context/SocketProvider";

const ModalComponent = () => {
  const dispatch = useDispatch();
  const containerStyle = { backgroundColor: "white", padding: 5 };
  const { socket } = useContext(SocketContext);
  const { open, pedido } = useSelector((state) => state.modalContent);
  const hideModal = () => {
    dispatch(closeModal());
  };

  const sendPedido = async()=>{
    socket?.emit('domicilio:varecoger', pedido, hideModal)
  }

  return (
    <Provider>
      <Portal>
        <Modal
          visible={open}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Card>
            <Card.Content>
              <Title>Detalle</Title>
              <Text>
                Precio: <Text>${pedido?.valor_domicilio}</Text>
              </Text>
              <Text>
                Celular: <Text>{pedido?.celular}</Text>
              </Text>
              <Text>
                Nombre: <Text>{pedido?.nombre}</Text>
              </Text>
              <Text>
                Recoger: <Text>{pedido?.recoger}</Text>
              </Text>
              <Text>
                Entregar: <Text>{pedido?.entregar}</Text>
              </Text>
              <Text>
                forma de pago: <Text>{pedido?.forma_pago}</Text>
              </Text>
              <View style={styles.titleMain}>
                <Text style={styles.titleText}>Asegurado:</Text>
                <Checkbox status={pedido?.asegurar ? "checked" : "unchecked"} />
              </View>
              <Paragraph>{pedido?.descripcion}</Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button onPress={hideModal}>Cancelar</Button>
              <Button onPress={sendPedido}>Aceptar</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  titleMain: {
    flexDirection: "row",
    alignContent: "center",
  },
  titleText: {
    textAlignVertical: "center",
  },
});
