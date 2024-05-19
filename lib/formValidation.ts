import { z } from "zod";
export const FormSchema = z.object({
    workoutNames: z.string().min(1, 'Name is required'),
    repAndSet: z.string()
})

export const AllWorkoutsSchema = z.object({
    numberOfWorkouts: z.string().optional(),
    allWorkouts: z.array(FormSchema),
});
