const path = require("path");
const admin = require("firebase-admin");
function initFirebase() {
  const serviceAccount = require("../firebase.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

initFirebase();


async function sendMessage(message) {
  try {
    await admin.messaging().sendMulticast({
      tokens: message.tokens,
      notification: {
        title: "Nuevo Pedido",
        body: `recoger ${message.recoger} - entregar ${message.entregar}`,
        imageUrl: `https://${require("ip").address()}/uploads/assets/icon-notifiaction.png`,
      },
    });
    console.log("****NOTIFICAIÓN ENVIADA*****");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMessage };
