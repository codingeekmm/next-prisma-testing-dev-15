import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import { prisma } from '@/app/_utils/prismaSingleton';
// import logger from '@/log4j/log4j';
// logger.level = "info";

export async function GET(request: NextRequest,{ params }: { params: { id: number }}) {
    const id = params.id;
    // console.log("Get Param ID",id);
    const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if(!user){
        // logger.error(`No Employee Found Error!.`);
        return NextResponse.json({message:"Not Found!"},{ status: 404 })
      }
    //   logger.info(`Request API success for ${id}.`)
      return NextResponse.json(user)
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({method:"PUT",message:"success"})
}

export async function DELETE(request: NextRequest,{ params }: { params: { id: number }}) {
  const id = params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  if(!deleteUser){
    return NextResponse.json({message:"Not Found!"},{ status: 404 })
  }
  return NextResponse.json(deleteUser)
}