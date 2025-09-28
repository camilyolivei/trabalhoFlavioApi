import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  postBusiness = new PostBusiness();

  criarPost = (req: Request, res: Response) => {
    try {
      const { title, content, authorId } = req.body;
      const newPost = this.postBusiness.criarPost(title, content, authorId);
      res.status(201).send({
        success: true,
        message: "Post criado com sucesso.",
        data: newPost,
      });
    } catch (error: any) {
      if (error.message.includes("ID do autor não encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };

  atualizarPostParcial = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedPost = this.postBusiness.atualizarPostParcial(id, updates);
      res.status(200).send({
        success: true,
        message: "Post atualizado parcialmente.",
        data: updatedPost,
      });
    } catch (error: any) {
      if (error.message.includes("Post não encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };

  removerPost = (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = parseInt(req.headers["user-id"] as string);
      const isRemoved = this.postBusiness.removerPost(postId, userId);

      if (isRemoved) {
        res
          .status(200)
          .send({ success: true, message: "Post removido com sucesso." });
      } else {
        res
          .status(404)
          .send({ success: false, message: "Post não encontrado." });
      }
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else if (error.message.includes("não autorizada")) {
        res.status(403).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };
}
