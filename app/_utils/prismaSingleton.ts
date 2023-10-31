import { PrismaClient } from "@prisma/client";

// ページがリロードされるたびに PrismaClient インスタンスが生成され、
// それらが DB 接続をして「 FATAL: too many connections」となることを抑制するため
// PrismaClient のインスタンスをシングルトンにするための処理。

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    //log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// import { PrismaClient } from "@prisma/client";
// // import { dbLog } from "@/mroGlobleLogger/logger";
// const prismaClientSingleton = () => {
//   const prisma = new PrismaClient({
//     // Configure your logging options here if needed
//     log: [
//       {
//         emit: "stdout",
//         level: "error",
//       },
//       {
//         emit: "stdout",
//         level: "warn",
//       },
//       {
//         emit: "event",
//         level: "query",
//       },
//     ],
//   });
//   prisma.$on("query", (e) => {
//     console.log("Prisma Error Start #####");
//     console.log("PrismaLogxxxx", e);
//     console.log("Prisma Error End  #####");
//     // console.log(e.query);
//     // console.log(e.params);
//     const paramsArray = JSON.parse(e.params);
//     paramsArray.map((param: any, index: number) => {
//       // e.query = e.query.replace('?,', param);
//       e.query = e.query.replace(`$${index + 1}`, JSON.stringify(param));
//     });
//     // console.log(e);
//     // dbLog.info(e.query);
//   });
//   return prisma;
// };
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };
// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
// export default prisma;
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
