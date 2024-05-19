import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import {OpenAI} from "openai"
import { AllWorkoutsSchema } from "@/lib/formValidation";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            allWorkouts
        } = AllWorkoutsSchema.parse(body);
        //   const entryData = allWorkouts.map((workout) => ({
        //       workoutNames: workout.workoutNames,
        //       repAndSet: workout.repAndSet,
        //     }))
        const workoutNames = allWorkouts.map(workout => workout.workoutNames).join(", ");
        const repAndSet = allWorkouts.map(workout => workout.workoutNames).join(", ");
        console.log("Workout names: ", workoutNames)
        console.log("repAndSet: ", repAndSet)
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
                content: `Analyze the increase or decrease in the number of reps and sets for each workout. Highlight any gaps or inconsistencies in the workout routine. Measure the intensity of workouts based on the volume (reps x sets).`,
              },
              {
                role: "user",
                content: `Use the following workout data to generate the analysis: These are the workout names: \n${workoutNames}\n\n and reps and set:\n${repAndSet}\n\n corresponding to each workouts. Display the workout analysis in the following format:\n- Increase or decrease in the number of reps and sets for each workout:\n- Any gaps or inconsistencies:\n- Intensity of workouts based on the volume (reps x sets):\n- What muscles the user should target more:\n`,
              }
            ],
          });
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[API_ERROR]", error);
        return new NextResponse("Internal server error", {status: 500});
    }

}