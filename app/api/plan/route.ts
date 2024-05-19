import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import {OpenAI} from "openai"
import { AllWorkoutsSchema, FormSchema } from "@/lib/formValidation";
import { allWorkouts } from "@/lib/data";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});


export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        // const body = await req.json();
        // const {
        //     workoutNames, repAndSet
        // } = FormSchema.parse(body);
        if (!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if (!openai.apiKey){
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a fitness coach, you will help the user plan their next gym session!`,
              },
              {
                role: "user",
                content: `Plan a gym session for the user. Refer to the workout list to suggest workouts to the user. ${allWorkouts}. Display in the following format:
                Workout name:
                Rep and Set the user should do:
                Estimated time:

                For cardio display it like this:
                Cardio estimated time:
                Calories to burn goal: `,
              }
            ],
          });
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[API_ERROR]", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}