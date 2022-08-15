import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  //verfiicando que se recibio el token
  /*  console.log(req.headers.authorization); */
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado"
      );
      // para irse al siguiente middleware
      return next();
    } catch (error) {
      const e = new Error("Token no valido");
      res.status(403).json({ msg: e.message });
    }
    if (!token) {
      const e = new Error("Token no valido o inexistente");
      res.status(403).json({ msg: e.message });
    }
  }
  next();
};

export default checkAuth;
