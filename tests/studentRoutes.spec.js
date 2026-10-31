import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
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

describe("Rotas /alunos (Supertest)", () => {
  it("POST /alunos - deve retornar status 201 ao criar aluno", async () => {
    prisma.student.findUnique.mockResolvedValue(null);
    prisma.student.create.mockResolvedValue({
      id: "uuid-456",
      name: "Maria Souza",
      email: "maria@email.com",
    });

    const response = await request(app)
      .post("/alunos")
      .send({
        name: "Maria Souza",
        email: "maria@email.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Maria Souza");
  });

  it("GET /alunos - deve retornar status 200 e lista de alunos", async () => {
    prisma.student.findMany.mockResolvedValue([
      { id: "1", name: "Maria Souza", email: "maria@email.com" },
    ]);

    const response = await request(app).get("/alunos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });
});