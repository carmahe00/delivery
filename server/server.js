// Servidor de Express
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const DomicilioList = require("./domicilio-list");
const { sequelize } = require("../models/index");
const {
  grabarDomicilio,
  fetchDetails,
  changeSteteDomicilio,
  allDomicilios,
  changeStateCamino,
  changeStateEntregado,
  changeStateConfrimado,
  changeStateCancel,
} = require("../controllers/socket");

class Servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.domicilioList = new DomicilioList();

    // Http server
    this.server = createServer(this.app);

    // Configuraciones de sockets
    this.io = new Server(this.server, {
      cors: {
        origins: ["*"],
        allowedHeaders: ["authorization"],
        credentials: true,
      },
    });

    this.io.use(async (socket, next) => {
      if (socket.request.headers.authorization) {
        const info = JSON.parse(socket.request.headers.authorization);

        const user = await fetchDetails(info);
        socket.user = user.dataValues;
        if (user) this.domicilioList.agregarUsuario(socket.user);
        next();
      }
    });

    this.io.on("connection", async (socket) => {
      socket?.user.rol && socket.join(socket.user.ciudad.dataValues.nombre);

      this.io
        .to(socket.user.ciudad.dataValues.nombre)
        .emit("lista-domicilios", await allDomicilios());

      socket.on("emitir-mensaje", async (data) => {
        const domicilio = await grabarDomicilio({
          ...data,
          id_proveedor: socket.user.id_usuario,
        });
        if (domicilio.message)
          return socket.emit("error-solicitud", domicilio.message);
        else
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        this.domicilioList.agregarDomicilios(domicilio);
      });

      socket.on("domicilio:varecoger", async (data, callback) => {
        if (this.domicilioList.verificarActivo(socket.user.uuid))
          return socket.emit(
            "error-solicitud",
            "Usted tiene un domicilio pendiente"
          );
        const updateDomicilio = await changeSteteDomicilio(data, socket.user);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else {
          socket.emit("domicilio:encamino", updateDomicilio);
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        }

        this.domicilioList.asignarDomicilio(
          socket.user.uuid,
          updateDomicilio?.dataValues.id_pedido,
          updateDomicilio.estado
        );
        callback();
      });

      socket.on("domicilio:encamino", async (data, callback) => {
        const updateDomicilio = await changeStateCamino(data);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else {
          socket.emit("domicilio:encamino", updateDomicilio);
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        }

        callback();
      });

      socket.on("domicilio:entregado", async (data, callback) => {
        const updateDomicilio = await changeStateEntregado(data);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else {
          socket.emit("domicilio:encamino", updateDomicilio);
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        }

        this.domicilioList.removerDomicilio(
          socket.user.uuid,
          updateDomicilio?.dataValues.id_pedido
        );
        console.log("asignados:", this.domicilioList.asignados);
        callback();
      });

      socket.on("domicilio:confirmado", async (data) => {
        const updateDomicilio = await changeStateConfrimado(data);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else {
          socket.emit("domicilio:encamino", updateDomicilio);
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        }
      });

      socket.on("domicilio:cancelar", async (data) => {
        const updateDomicilio = await changeStateCancel(data);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else {
          socket.emit("domicilio:encamino", updateDomicilio);
          this.io
            .to(socket.user.ciudad.dataValues.nombre)
            .emit("lista-domicilios", await allDomicilios());
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  middlewares() {
    // CORS
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use("/api/users", require("../routers/userRouter"));
    this.app.use("/api/cities", require("../routers/cityRoute"));
    this.app.use("/api/uploads", require("../routers/uploadRouters"));
    this.app.use("/api/pedidos", require("../routers/pedidosRouter"));
    this.app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "../uploads"))
    );
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();
    // Inicializar Server
    this.server.listen(this.port, async () => {
      console.log(`Server up on http://localhost:${process.env.PORT}`);
      try {
        await sequelize.authenticate();
        console.log("Base de datos sincronizada!");
      } catch (error) {
        console.log("**** Error ****");
        console.error(error);
      }
    });
  }
}

module.exports = Servidor;
