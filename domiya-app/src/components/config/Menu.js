import React, { useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { API } from "@env";
import { List, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/userActions";
import { SocketContext } from "../../context/SocketProvider";

const Menu = () => {
  const { desconectarSocket } = useContext(SocketContext);
  const { userInfo, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de salir?",
      [
        { text: "No" },
        {
          text: "Si",
          onPress: () => {
            desconectarSocket()
            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
    );
  };
  if (loading) return <ComponentLoading />;
  return (
    <ScrollView>
      <List.Subheader>Mi Cuenta</List.Subheader>
      <List.Item
        title="Nombre"
        description={userInfo?.usuario.nombre}
        left={(props) => <List.Icon {...props} icon="face" />}
      />
      <List.Item
      title="Imagen"
      description="Imagen actual"
        left={() => (
          <Avatar.Image
            
            source={{ uri: `${API}${userInfo?.usuario.imagen}` }}
          />
        )}
      />
      <List.Item
        title="Correo"
        description={userInfo?.usuario.email}
        left={(props) => <List.Icon {...props} icon="at" />}
      />
      <List.Item
        title="Ciudad"
        description={userInfo?.usuario["ciudad.nombre"]}
        left={(props) => <List.Icon {...props} icon="city" />}
      />
      
      <List.Item
        title="Celular"
        description={userInfo?.usuario.celular}
        left={(props) => <List.Icon {...props} icon="phone" />}
      />
      <List.Item
        title="Direccion"
        description={userInfo?.usuario.direccion}
        left={(props) => <List.Icon {...props} icon="map" />}
      />
      <List.Item
        title="Placa"
        description={userInfo?.usuario.placa}
        left={(props) => <List.Icon {...props} icon="car" />}
      />
      <List.Item
        title="Vehiculo"
        description={userInfo?.usuario.tipo_vehiculo}
        left={(props) => <List.Icon {...props} icon="car-estate" />}
      />
      <List.Item
        title="Cerrar sesión"
        description="Cierra está sesión y inicia con otra"
        left={(props) => <List.Icon {...props} icon="logout" />}
        onPress={logoutAccount}
      />
    </ScrollView>
  );
};

export default Menu;
