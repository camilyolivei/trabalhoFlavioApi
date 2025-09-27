import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", postController.criarPost);
postRouter.patch("/:id", postController.atualizarPostParcial);
postRouter.delete("/:id", postController.removerPost);
