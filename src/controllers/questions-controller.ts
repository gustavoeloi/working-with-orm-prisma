import { Request, Response } from "express";

import { prisma } from "../../lib/prisma";

class QuestionsController {
  async index(request: Request, response: Response) {
    const questions = await prisma.question.findMany({
      where: {
        title: {
          contains: request.query.title?.toString().trim(),
          mode: "insensitive",
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { title, content, user_id } = request.body;

    await prisma.question.create({
      data: {
        title,
        content,
        userId: user_id,
      },
    });

    return response.status(201).json();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const data = Object.fromEntries(
      Object.entries(request.body).filter(([_, v]) => v !== undefined)
    );

    await prisma.question.update({
      data,
      where: { id },
    });

    return response.json();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.question.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}

export { QuestionsController };
