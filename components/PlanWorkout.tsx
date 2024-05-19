"use client"
import { mainTitle } from "@/fonts/font";
import { Loader2 } from "lucide-react";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
export default function Reports(){
    const [isLoading, setIsLoading] = useState(false);
    const [planResult, setPlanResult] = useState<string | null>("Nothing yet. Create a plan for your gym session, now!")
    const planWorkout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/plan", {})
            setPlanResult(response.data.content);
            console.log(response.data.content)
        }
        catch(error) {
            console.error("Error during planning", error);
            setPlanResult("Failed to get a plan for you. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <div className="py-16 flex flex-col items-center justify-center">
            <div className="bg-slate-900 p-6 rounded-lg w-4/5">
            <p className={`${mainTitle.className} text-center text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Plan workout </p>
            <div className=" flex flex-col items-center justify-center gap-4 text-slate-100">
            <div className="hover:drop-shadow-glow hover:scale-110">
                <Button onClick={planWorkout} variant="secondary">
                    Plan NOW
                </Button>
            </div>
            <div className={` items-center justify-center`}>
                <p> Your next gym session plan: </p>
                <hr />
                {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (planResult?.split("\n").map((paragraph, index) => (
                <p key={index} style={{ margin: '10px 0' }}>
                  {paragraph}
                </p>)))
                }
            </div>
        </div>
            </div>
        </div>
    )
}