import { posts } from "../bd";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

export class PostData {
  criarPost = (post: Post) => {
    posts.push(post);
    return post;
  };

  buscarPostPorId = (id: number) => {
    return posts.find((post) => post.id === id);
  };

  buscarPostsPorAutorId = (authorId: number) => {
    return posts.filter((post) => post.authorId === authorId);
  };

  atualizarPostParcialmente = (id: number, updates: any) => {
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new Error("Post não encontrado para atualização parcial.");
    }
    posts[index] = { ...posts[index], ...updates };
    return posts[index];
  };

  removerPost = (id: number) => {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
    }
    return postIndex !== -1;
  };
}
