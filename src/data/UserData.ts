import { users } from "../bd";

export class UserData {
  buscarUsuarioPorEmail = (email: string) => {
    const userFound = users.find((user) => user.email === email);
    return userFound;
  };

  buscarUsuarioPorId = (id: number) => {
    const userFound = users.find((user) => user.id === id);
    return userFound;
  };

  buscarTodosUsuarios = () => {
    return users;
  };

  buscarUsuarioPorFaixaEtaria = (min: number, max: number) => {
    const userFound = users.filter(
      (user) => user.idade >= min && user.idade <= max,
    );
    return userFound;
  };

  atualizarUsuario = (id: number, newUser: any) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("Usuário não encontrado para atualização.");
    }
    users[index] = { ...newUser, id: users[index].id };
    return users[index];
  };

  removerUsuariosPorIds = (ids: number[]) => {
    const usuariosRemovidos = [];
    for (let i = users.length - 1; i >= 0; i--) {
      if (ids.includes(users[i].id)) {
        usuariosRemovidos.push(users.splice(i, 1)[0]);
      }
    }
    return usuariosRemovidos;
  };
}
