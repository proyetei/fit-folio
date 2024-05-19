import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import {OpenAI} from "openai"
import { AllWorkoutsSchema, FormSchema } from "@/lib/formValidation";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const listOfMuscles = ["Pectorals", "Biceps", "Triceps", "Deltoids", "Latissimus Dorsi", "Quadriceps", "Hamstrings", "Glutes", "Abdominals", "Calves"];

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            workoutNames, repAndSet
        } = FormSchema.parse(body);
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
                content: `Tell the user what muscles they should target more for balance. Refer to list of muscles: ${listOfMuscles}. Then tell them what workout they should do to target that muscle. Additonally, measure the intensity of workouts based on the volume (reps x sets).`,
              },
              {
                role: "user",
                content: ` Use the following workout data to generate the analysis: 
                These are the workout names: \n${workoutNames}\n\n and reps and set:\n${repAndSet}\n\n corresponding to each workouts. 
                Display the workout analysis in the following format:

                Intensity of workouts based on the volume (reps x sets):
                
                What muscles the user should target more:\n`,
              }
            ],
          });
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[API_ERROR]", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}