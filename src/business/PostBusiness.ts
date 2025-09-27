import { PostData } from "../data/PostData";
import { UserData } from "../data/UserData";

export class PostBusiness {
  postData = new PostData();
  userData = new UserData();

  criarPost = (title: string, content: string, authorId: number) => {
    if (!title || !content || !authorId) {
      throw new Error(
        "Campos 'title', 'content' e 'authorId' são obrigatórios",
      );
    }

    if (title.length < 3) {
      throw new Error("O título deve ter no mínimo 3 caracteres");
    }

    if (content.length < 10) {
      throw new Error("O conteúdo deve ter no mínimo 10 caracteres");
    }

    const author = this.userData.buscarUsuarioPorId(authorId);
    if (!author) {
      throw new Error("ID do autor não encontrado");
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false,
    };

    return this.postData.criarPost(newPost);
  };

  atualizarPostParcial = (id: number, updates: any) => {
    if (!updates.title && !updates.content && updates.published === undefined) {
      throw new Error(
        "Nenhum campo válido fornecido para atualização parcial.",
      );
    }
    if (isNaN(id)) {
      throw new Error("ID inválido, deve ser um número");
    }

    const post = this.postData.buscarPostPorId(id);
    if (!post) {
      throw new Error("Post não encontrado.");
    }

    const camposPermitidos = ["title", "content", "published"];
    for (const key in updates) {
      if (!camposPermitidos.includes(key)) {
        throw new Error(`O campo '${key}' não pode ser atualizado.`);
      }
    }

    return this.postData.atualizarPostParcialmente(id, updates);
  };

  removerPost = (postId: number, userId: number) => {
    if (isNaN(postId)) {
      throw new Error("ID do post inválido, deve ser um número");
    }
    if (isNaN(userId)) {
      throw new Error("ID do usuário inválido, deve ser um número");
    }

    const post = this.postData.buscarPostPorId(postId);
    if (!post) {
      throw new Error("Post não encontrado.");
    }

    const user = this.userData.buscarUsuarioPorId(userId);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const isAuthor = post.authorId === userId;
    const isAdmin = user.role === "admin";

    if (!isAuthor && !isAdmin) {
      throw new Error(
        "Ação não autorizada. Apenas o autor ou um administrador pode remover este post.",
      );
    }

    return this.postData.removerPost(postId);
  };

  usuarioTemPosts = (userId: number) => {
    const posts = this.postData.buscarPostsPorAutorId(userId);
    return posts.length > 0;
  };
}
