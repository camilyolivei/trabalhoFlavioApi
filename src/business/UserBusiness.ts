import { UserData } from "../data/UserData";
import { PostBusiness } from "./PostBusiness";

export class UserBusiness {
  userData = new UserData();
  postBusiness = new PostBusiness();

  verify = (email: string) => {
    if (!email) {
      throw new Error("Campos faltantes");
    }

    const user = this.userData.buscarUsuarioPorEmail(email);
    if (!user) {
      throw new Error("Usuario inexistente");
    }
    return user;
  };

  obterUsuarioPorId = (id: number) => {
    if (isNaN(id)) {
      throw new Error("ID deve ser um número");
    }
    const user = this.userData.buscarUsuarioPorId(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  };

  obterUsuarioPorFaixaEtaria = (min: number, max: number) => {
    if (isNaN(min) || isNaN(max)) {
      throw new Error("Parâmetros 'min' e 'max' devem ser números");
    }
    const users = this.userData.buscarUsuarioPorFaixaEtaria(min, max);
    if (users.length === 0) {
      throw new Error("Nenhum usuário encontrado na faixa etária");
    }
    return users;
  };

  atualizarUsuarioCompleto = (
    id: number,
    name: string,
    email: string,
    senha: string,
    idade: number,
  ) => {
    if (isNaN(id)) {
      throw new Error("ID inválido, deve ser um número");
    }
    if (!name || !email || !senha || !idade) {
      throw new Error(
        "Todos os campos (name, email, senha, idade) são obrigatórios para a atualização completa.",
      );
    }

    const user = this.userData.buscarUsuarioPorId(id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const emailExists = this.userData.buscarUsuarioPorEmail(email);
    if (emailExists && emailExists.id !== id) {
      throw new Error("O e-mail fornecido já está em uso por outro usuário.");
    }

    const updatedUser = { id, name, email, senha, idade, role: user.role };
    return this.userData.atualizarUsuario(id, updatedUser);
  };

  removerUsuariosInativos = (confirm: string) => {
    if (confirm !== "true") {
      throw new Error(
        "Parâmetro de confirmação 'confirm=true' é obrigatório para esta ação.",
      );
    }

    const todosUsuarios = this.userData.buscarTodosUsuarios();
    const usuariosParaRemover = [];

    for (const user of todosUsuarios) {
      if (
        !this.postBusiness.usuarioTemPosts(user.id) &&
        user.role !== "admin"
      ) {
        usuariosParaRemover.push(user.id);
      }
    }

    if (usuariosParaRemover.length === 0) {
      throw new Error(
        "Nenhum usuário inativo elegível para remoção foi encontrado.",
      );
    }

    const removidos = this.userData.removerUsuariosPorIds(usuariosParaRemover);
    return removidos;
  };
}
