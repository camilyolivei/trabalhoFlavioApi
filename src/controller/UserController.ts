import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  userBusiness = new UserBusiness();

  verify = (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = this.userBusiness.verify(email);
      res.status(200).send({
        success: true,
        message: "Usuário verificado com sucesso.",
        data: user,
      });
    } catch (error: any) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  obterUsuarioPorId = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = this.userBusiness.obterUsuarioPorId(id);
      res
        .status(200)
        .send({ success: true, message: "Usuário encontrado.", data: user });
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };

  obterUsuarioPorFaixaEtaria = (req: Request, res: Response) => {
    try {
      let min = req.query.min;
      let max = req.query.max;

      if (!min || !max) {
        res.status(400).send({
          success: false,
          message: "Min e Max são obrigatorios.",
          data: [],
          total: 0,
        });

        return;
      }

      const min_int = parseInt(min as string);
      const max_int = parseInt(max as string);

      if (min_int < 0 || max_int < 0) {
        res.status(200).send({
          success: true,
          message: "Valores negativos não são permitidos",
          data: [],
          total: 0,
        });

        return;
      }

      if (min_int > max_int) {
        res.status(400).send({
          success: false,
          message: "Min e maior que Max.",
          data: [],
          total: 0,
        });

        return;
      }

      const users = this.userBusiness.obterUsuarioPorFaixaEtaria(
        min_int,
        max_int,
      );
      res.status(200).send({
        success: true,
        message: "Usuários encontrados.",
        data: users,
        total: users.length,
      });
    } catch (error: any) {
      if (error.message.includes("Nenhum usuário encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };

  atualizarUsuarioCompleto = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, email, senha, idade } = req.body;
      const updatedUser = this.userBusiness.atualizarUsuarioCompleto(
        id,
        name,
        email,
        senha,
        idade,
      );
      res.status(200).send({
        success: true,
        message: "Usuário atualizado com sucesso.",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).send({ success: false, message: error.message });
      } else if (error.message.includes("e-mail fornecido já está em uso")) {
        res.status(409).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };

  removerUsuariosInativos = (req: Request, res: Response) => {
    try {
      const confirm = req.query.confirm as string;
      const removedUsers = this.userBusiness.removerUsuariosInativos(confirm);
      res.status(200).send({
        success: true,
        message: "Usuários removidos com sucesso.",
        data: removedUsers,
        total: removedUsers.length,
      });
    } catch (error: any) {
      if (error.message.includes("Nenhum usuário inativo")) {
        res.status(404).send({ success: false, message: error.message });
      } else {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  };
}
