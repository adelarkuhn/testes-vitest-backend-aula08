import { prisma } from "../prisma.js";

export class StudentService {
  async createStudent({ name, email }) {
    if (!name || !email) {
      throw new Error("Nome e e-mail são obrigatórios.");
    }

    const studentAlreadyExists = await prisma.student.findUnique({
      where: { email },
    });

    if (studentAlreadyExists) {
      throw new Error("Aluno já cadastrado com este e-mail.");
    }

    const student = await prisma.student.create({
      data: { name, email },
    });

    return student;
  }

  async listStudents() {
    return await prisma.student.findMany();
  }
}