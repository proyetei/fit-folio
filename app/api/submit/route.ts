
import { newUser } from "@/lib/newUser";
import { AllWorkoutsSchema, FormSchema } from '@/lib/formValidation';
import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs";
import { Form } from "react-hook-form";

export async function GET(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
    const result = await db.entry.findMany({
      where:{userId: currentUser?.id},
    });

    return NextResponse.json( result );
  } catch (error: any) {
    console.log("Error with GET API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
  const user = await newUser();
  const {
    allWorkouts, title
  } = AllWorkoutsSchema.parse(body);
  const entryData = {
    allWorkouts: allWorkouts.map((workout) => ({
      workoutNames: workout.workoutNames,
      repAndSet: workout.repAndSet,
    })),
    userId: user?.id,
    title: title,
  };

  const createdEntry = await db.entry.create({
    data: entryData
  });

    return NextResponse.json({ createdEntry });
  } catch (error: any) {
    console.log("Error with POST API endpoint ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}