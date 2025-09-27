import { app } from "./app";
import { userRouter } from "./routes/userRouter";
import { postRouter } from "./routes/postRouter";

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003 = http://localhost:3003/");
});
