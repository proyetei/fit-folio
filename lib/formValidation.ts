import { z } from "zod";
export const FormSchema = z.object({
    workoutNames: z.string({
        required_error: "Please select a workout name.",
      }),
    repAndSet: z.string()
})

export const AllWorkoutsSchema = z.object({
    numberOfWorkouts: z.string().optional(),
    allWorkouts: z.array(FormSchema),
});