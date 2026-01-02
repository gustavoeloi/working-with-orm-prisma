import { prisma } from "../lib/prisma";

async function seed() {
  await prisma.user.createMany({
    data: [
      { name: "Gustavo Henrique", email: "gustavooloi.dev@gmail.com" },
      { name: "Gabriel Rodrigues", email: "gabrielrodrigues.dev@gmail.com" },
      { name: "Gabriel Fagundes", email: "fagundes.dev@gmail.com" },
    ],
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
