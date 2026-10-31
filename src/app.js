import express from "express";
import { StudentController } from "./controllers/studentController.js";

const app = express();
const studentController = new StudentController();

app.use(express.json());

app.post("/alunos", studentController.create);
app.get("/alunos", studentController.list);

export { app };