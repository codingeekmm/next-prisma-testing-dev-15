import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Product, ProductNew } from "@prisma/client";
import { prisma } from "@/app/_utils/prismaSingleton";

//Find All
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const getProducts = await prisma.productNew.findMany();
//     // console.log("Find Employee",getEmployees)
//     if (getProducts.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(getProducts);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//UNION ALL
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const products = await prisma.product.findMany({
//       select: {
//         model: true,
//       },
//     });
//     const newproducts = await prisma.productNew.findMany({
//       select: {
//         model: true,
//       },
//     });

//     // Concatenate the results
//     const result = [
//       ...products.map((p) => p.model),
//       ...newproducts.map((pn) => pn.model),
//     ];

//     //const result = [...new Set([...products.map(p => p.model), ...productNew.map(pn => pn.model)])];
//     // return result;
//     console.log("result", result.length);
//     if (result.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(result);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//UNION
// export async function GET(request: NextRequest) {
//   try {
//     // get all data from database via model
//     const products = await prisma.product.findMany({
//       select: {
//         model: true,
//       },
//     });
//     const newproducts = await prisma.productNew.findMany({
//       select: {
//         model: true,
//       },
//     });

//     //select the union of models from both "Product" and "ProductNew" tables.
//     const result = Array.from(
//       new Set([
//         ...products.map((p) => p.model),
//         ...newproducts.map((pn) => pn.model),
//       ])
//     );

//     console.log("result", result.length);
//     if (result.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(result);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//Test joining two result set
// export async function GET(request: NextRequest) {
//   try {
//     const orders = await prisma.order.findMany();
//     const products = await prisma.product.findMany();

//     // Perform the join based on a condition
//     const joinedData = orders.map((order) => {
//       const matchingProducts = products.find(
//         (product) => product.id === order.product_id
//       );

//       if (matchingProducts) {
//         // Merge the data from both models into a single object
//         return {
//           ...order,
//           ...matchingProducts,
//         };
//         // If no match is found, return the orders.
//         return order;
//       }
//     });

//     if (joinedData.length > 0) {
//       // logger.info("Call All Employee Success-GET All!")
//       return NextResponse.json(joinedData);
//     } else {
//       return NextResponse.json({ message: "No record found" }, { status: 404 });
//     }
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }

//select products included in both table
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      select: {
        model: true,
      },
    });
    const newproducts = await prisma.productNew.findMany({
      select: {
        model: true,
      },
    });

    const uniqueproducts = Array.from(
      new Set([
        ...products.map((product) => product.model),
        ...newproducts.map((newproduct) => newproduct.model),
      ])
    );

    // const joinedData = orders.map((order) => {
    //   const matchingProducts = products.find(
    //     (product) => product.id === order.product_id
    //   );

    // const joinedData = products.map((product) => {
    //   const matchingProducts = newproducts.find(
    //     (newproduct) => newproduct.id === product.id
    //   );

    //   if (matchingProducts) {
    //     // Merge the data from both models into a single object
    //     return {
    //       ...product,
    //       ...matchingProducts,
    //     };
    //   }
    // });

    // const joined_newproducts = await prisma.productNew.findMany({
    //   where: {
    //     model: {
    //       in: uniqueproducts,
    //     },
    //   },
    // });

    // const joined_oldproducts = await prisma.product.findMany({
    //   where: {
    //     model: {
    //       in: uniqueproducts,
    //     },
    //   },
    // });

    if (uniqueproducts.length > 0) {
      console.log(uniqueproducts.length);
      // logger.info("Call All Employee Success-GET All!")
      return NextResponse.json(uniqueproducts);
    } else {
      return NextResponse.json({ message: "No record found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // get data from body
    const productnew: ProductNew = await request.json();
    console.log("body>>", productnew);
    // insert data to database via model
    const createdProductNew = await prisma.productNew.create({
      data: {
        ...productnew,
      },
    });
    // console.log("Created Employee",createdEmployee);
    // logger.info(`Employee ${createdEmployee.id} has been created successfully!.`);
    return NextResponse.json({ createdProductNew }, { status: 201 });
  } catch (e) {
    console.log("Employee Post Error", e);
    // logger.error(`Employee Already exist error!.`);
    // return  new Response(JSON.stringify({message:"error"}),{status:500})
    return NextResponse.json({ message: "Resource Existed" }, { status: 400 });
  }
}
