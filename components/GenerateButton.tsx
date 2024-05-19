"use client"
import { Entry } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { subTitle } from "@/fonts/font";
import LoadingAnimation from "./LoadingAnimation";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const GenerateButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>("No analysis yet.")
    const [workouts, setWorkout] = useState<Entry[]>([]);
    useEffect(() => {
        const fetchEntries = async () => {
            setIsLoading(true);
        try {
            const response = await axios.get('/api/submit', {});
            setWorkout(response.data);
        } catch (error) {
            console.error("Error fetching workout information:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchEntries();
    }, []);

    const reversedWorkout = [...workouts].reverse()
    const workoutInfo = reversedWorkout?.flatMap((eachEntry) => {
        return (eachEntry.allWorkouts as Array<{ workoutNames: string; repAndSet: string }>).map((workout) => ({
            workoutNames: workout.workoutNames,
            repAndSet: workout.repAndSet
        }));
    });
    const workoutNames = workoutInfo.map(workout => workout.workoutNames).join(", ");
    const repAndSet = workoutInfo.map(workout => workout.repAndSet).join(", ");
    console.log("Workout names: ", workoutNames)
    console.log("repAndSet: ", repAndSet)
    console.log(workoutInfo)
    const analyzeEntries = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/analyze", {
                workoutNames: workoutNames,
                repAndSet: repAndSet,
            })
            setAnalysisResult(response.data.content);
            console.log(response.data.content)
        }
        catch(error) {
            console.error("Error during analysis", error);
            setAnalysisResult("Failed to perform analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <div className=" flex flex-col items-center justify-center gap-4 text-slate-100">
            <div className="hover:drop-shadow-glow hover:scale-110">
                <Button onClick={analyzeEntries} variant="secondary">
                    Generate!
                </Button>
            </div>
            {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (
            <div className={`${subTitle.className} items-center justify-center`}>
                <>
                <p> Amount of workouts </p>
                <hr />
                <p>{ workoutInfo.length }  </p>
                <br /> 
                </>
            </div> )}
            <div className={`${subTitle.className} items-center justify-center`}>
                <p> Analysis Result: </p>
                <hr />
                {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (analysisResult?.split("\n").map((paragraph, index) => (
                <p key={index} style={{ margin: '10px 0' }}>
                  {paragraph}
                </p>)))
                }
            </div>
        </div>
    )
}

export default GenerateButton