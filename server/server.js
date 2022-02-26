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
  waitingDomiciled,
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
      console.log(socket.request.headers.authorization);
      if (socket.request.headers.authorization) {
        const info = JSON.parse(socket.request.headers.authorization);
        const user = await fetchDetails(info);
        socket.user = user.dataValues;
        if (user) this.domicilioList.agregarUsuario(socket.user);
        next();
      }
    });

    this.io.on("connection", async (socket) => {
      console.log(socket.user.ciudad.dataValues.nombre);
      socket?.user.rol && socket.join(socket.user.ciudad.dataValues.nombre);

      this.io
        .to(socket.user.ciudad.dataValues.nombre)
        .emit("lista-domicilios", await allDomicilios());

      socket.on("emitir-mensaje", async (data) => {
        
        const domicilio = await grabarDomicilio({...data, id_proveedor: socket.user.id_usuario});
        if (domicilio.message)
          return socket.emit("error-solicitud", domicilio.message);
        else this.io.emit("lista-domicilios", await allDomicilios());
        this.domicilioList.agregarDomicilios(domicilio);
      });

      socket.on("domicilio:varecoger", async (data, callback) => {
        console.log("acá");
        if (this.domicilioList.verificarActivo(socket.user.uuid))
          return socket.emit(
            "error-solicitud",
            "Usted tiene un domicilio pendiente"
          );
        const updateDomicilio = await changeSteteDomicilio(data, socket.user);
        if (updateDomicilio.message)
          return socket.emit("error-solicitud", updateDomicilio.message);
        else this.io.emit("lista-domicilios", await allDomicilios());
        this.domicilioList.asignarDomicilio(
          socket.user.uuid,
          updateDomicilio.id_domicilio,
          updateDomicilio.estado
        );
        callback();
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
