import { describe, it, expect, vi } from "vitest";
import { StudentService } from "../src/services/studentService.js";
import { prisma } from "../src/prisma.js";

vi.mock("../src/prisma.js", () => ({
  prisma: {
    student: {
      findUnique: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe("StudentService (Testes Unitários)", () => {
  it("deve cadastrar um novo aluno com sucesso", async () => {
    const studentService = new StudentService();

    prisma.student.findUnique.mockResolvedValue(null);

    const mockStudent = {
      id: "uuid-123",
      name: "João Silva",
      email: "joao@email.com",
    };
    prisma.student.create.mockResolvedValue(mockStudent);

    const result = await studentService.createStudent({
      name: "João Silva",
      email: "joao@email.com",
    });

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("João Silva");
    expect(result.email).toBe("joao@email.com");
  });

  it("não deve permitir cadastrar aluno sem nome ou e-mail", async () => {
    const studentService = new StudentService();

    await expect(
      studentService.createStudent({ name: "", email: "teste@email.com" })
    ).rejects.toThrow("Nome e e-mail são obrigatórios.");
  });
});