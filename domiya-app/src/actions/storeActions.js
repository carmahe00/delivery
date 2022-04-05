import moment from "moment";
import { ORDER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeState } from "../utils/changeState";

export async function getAllOrders() {
  try {
    const orders = await AsyncStorage.getItem(ORDER);
    if (!orders) return [];
    return JSON.parse(orders);
  } catch (error) {
    return null;
  }
}

export async function addProductOrder(
  id_pedido,
  proveedor,
  nombre,
  fecha_hora_tmp,
  estado_tmp
) {
  try {
    let orders = await getAllOrders();
    let fecha_hora = moment(fecha_hora_tmp).format("DD MM YYYY, h:mm:ss");
    let estado = changeState(estado_tmp);
    if (!orders) throw "Error al obtener el carrito";
    if (orders.length === 0) {
      orders.push({
        id_pedido,
        fecha_hora,
        proveedor,
        nombre,
        estado,
      });
    } else {
      let found = false;
      orders.map((order) => {
        if (order.id_pedido === id_pedido) {
          found = true;
          order.estado = estado;
          return order;
        }
      });

      if (!found) {
        orders.push({
          id_pedido,
          fecha_hora,
          proveedor,
          nombre,
          estado,
        });
      }
      orders = orders.filter((order) => order.estado !== "ENTREGADO");
    }
    await AsyncStorage.setItem(ORDER, JSON.stringify(orders));
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteAllOrders() {
  try {
    await AsyncStorage.removeItem(ORDER);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
