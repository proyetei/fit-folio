"use client"
import { CgAddR, CgRemoveR } from "react-icons/cg"
import { Button } from "./ui/button"
import { useState, Fragment } from "react"
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AllWorkoutsSchema } from "@/lib/formValidation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { FaSquareCheck } from "react-icons/fa6"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"
import { useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GrPowerReset } from "react-icons/gr";
export default function SubmitWorkout() {
    const router = useRouter();
    const form = useForm<z.infer<typeof AllWorkoutsSchema>>({
        resolver: zodResolver(AllWorkoutsSchema),
    })
    const { register, control, handleSubmit, reset, watch, formState } = useForm<z.infer<typeof AllWorkoutsSchema>>({
        resolver: zodResolver(AllWorkoutsSchema),
        defaultValues: {
            numberOfWorkouts: "0",
            allWorkouts: []
        }
    });
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'allWorkouts',
    });

      // watch to enable re-render when workout number is changed
    const numberOfWorkouts = watch('numberOfWorkouts');
    useEffect(() => {
        const currentCount = fields.length;
        const targetCount = Number(numberOfWorkouts) || 0;
        if (targetCount > currentCount) {
            for (let i = currentCount; i < targetCount; i++) {
                append({ workoutNames: '', repAndSet: '' });
            }
        } else {
            for (let i = currentCount - 1; i >= targetCount; i--) {
                remove(i);
            }
        }
    }, [numberOfWorkouts, fields.length, append, remove]);

    const onSubmit = async (data: z.infer<typeof AllWorkoutsSchema>) => {
        try {
            // Extract only the allWorkouts array from the data
            const { allWorkouts } = data;
            // Send the allWorkouts array to the backend
            const response = await axios.post("/api/submit", { allWorkouts });
            await axios.get("/api/submit", {});
            form.reset();
            router.push("/dashboard")
            toast({
            title: "Success!",
            description: "Your entry was submitted",})
        } catch(error: any){
            console.error("API Request Error:", error);
            toast({
            title: "Error",
            description: "An error occurred while submitting your entry. Please try again.",
            duration: 5000,
        });
        }
    }
    function onReset() {
        reset();
        toast({
            description: "Form reset successful."
        })
    }
    return (
        <div className="items-center justify-center text-center">
            <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <div className="p-2 ">
            <FormField control={control} name="numberOfWorkouts" render={({ field }) => (
                <FormItem>
                    <div className="text-left text-slate-100">
                    <FormLabel> Select number of workouts </FormLabel>
                    </div>
                    <FormControl>
                        <Select {...register('numberOfWorkouts')} onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="md:w-[250px] w-full">
                                    <SelectValue placeholder="Select number of workouts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[1, 2, 3, 4, 5].map(i => <SelectItem key={i} value={i.toString()}>{i}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage>{errors.numberOfWorkouts?.message}</FormMessage>
                </FormItem>
                )} />
            </div>
                {fields.map((item, i) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:p-6 py-4 items-center justify-center" key={item.id}>
                        <FormField
                            key={item.id}
                            control={control}
                            name={`allWorkouts.${i}.workoutNames`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel> 
                                    <div className={` p-4 text-md `}> <span className=" md:text-base text-sm text-slate-100"> What workout did you do? </span> </div> 
                                </FormLabel>
                                <Input {...register(`allWorkouts.${i}.workoutNames`)} type="text" placeholder="Enter workout name" className="bg-zinc-900 border-none text-slate-100"/>
                                <FormMessage/>
                            </FormItem>
                            )} />
                            <FormField
                            key={item.id}
                            control={control}
                            name={`allWorkouts.${i}.repAndSet`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel> 
                                    <div className={` p-4 text-md `}> <span className=" md:text-base text-sm text-slate-100"> Enter reps(as x), and sets(as y) </span> </div> 
                                </FormLabel>
                                <Input {...register(`allWorkouts.${i}.repAndSet`)} type="text" placeholder="Enter number as: x,y" className="bg-zinc-900 border-none text-slate-100"/>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>     ))}
        <div className=" mx-auto items-center justify-center text-center">
        <Button className=" hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600" variant="default">
            <div className="flex flex-row gap-2 text-lg items-center justify-center">
                <FaSquareCheck /> SUBMIT
            </div>
        </Button>
        </div>
        </form>
        </Form>
        <div>
        <Button onClick={onReset}>
            <div className="flex flex-row gap-2 text-lg items-center justify-center">
                <GrPowerReset /> Reset
            </div>
        </Button>
        </div>
        </div> 
    );
}