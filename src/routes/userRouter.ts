import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/verify", userController.verify);
userRouter.get("/age-range", userController.obterUsuarioPorFaixaEtaria);
userRouter.get("/:id", userController.obterUsuarioPorId);
userRouter.put("/:id", userController.atualizarUsuarioCompleto);
userRouter.delete("/cleanup-inactive", userController.removerUsuariosInativos);
