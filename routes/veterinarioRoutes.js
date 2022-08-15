import express from "express";

const router = express.Router();
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//AREA PUBLICA
router.post("/", registrar);
// volviendo parametro dinamico con /:
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
// 1ra forma
/* router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword); */
// 2da forma
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
//FIN AREA PUBLICA

//AREA PRIVADA
//usando el middleware
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actualizar-password", checkAuth, actualizarPassword);
//FIN AREA PRIVADA

export default router;
