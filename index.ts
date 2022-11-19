import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // const allUsers = await prisma.user.findMany();
  // console.log(allUsers);
  await prisma.user.create({
    data: {
      name: "ketty",
      email: "ketty@gmail.com",
      posts: {
        create: { title: "hello postgres" },
      },
      profile: {
        create: { bio: "I like everything" },
      },
    },
  });
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true },
  // });
  // console.log(post);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
