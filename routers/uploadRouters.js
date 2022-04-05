const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const { validarJWT } = require("../middleware/validar-jwt");
const { validarCampos } = require("../middleware/validar-campos");
const { fileUploadUsers } = require("../controllers/uploadFile");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (req.path.includes("users")) cb(null, "uploads/users");
    else cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});


/**
 * Tiene todas la configuración del middleware
 */
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type"));
    }
  },
}).single("image");

/**
 * upload obtiene la informacion de la imagen
 */
router.post("/users/:uuid", [validarJWT, validarCampos], function (req, res) {
  upload(req, res, function (err) {
    
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (req.file) fileUploadUsers(req, res);
  });
});

module.exports = router;
