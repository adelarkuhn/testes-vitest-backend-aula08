import { StudentService } from "../services/studentService.js";

const studentService = new StudentService();

export class StudentController {
  async create(req, res) {
    try {
      const { name, email } = req.body;
      const student = await studentService.createStudent({ name, email });
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const students = await studentService.listStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar alunos." });
    }
  }
}