import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { FormSchema } from '@/lib/formValidation';
import { db } from '@/lib/db';
import { getCurrentUser } from "@/lib/getCurrentUser";
import { AllWorkoutsSchema } from '@/lib/formValidation';



export async function DELETE(
  req: Request,
  { params }: { params: { workoutId: string } },
) {
  try {
    const { workoutId } = params;
    const post = await db.entry.delete({
      where: { id: workoutId,} 
      // userId: currentUser?.id, }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("Error with DELETE API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

