"use client";

import React from "react";
import { motion } from "framer-motion";
import { mainTitle } from "@/fonts/font";
import { FormSchema } from "@/lib/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import * as z from "zod"
import { Button } from "./ui/button";
import { FaSquareCheck } from "react-icons/fa6";
import SubmitWorkout from "./SubmitWorkout";
export default function Add() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // send setWorkoutData to backend
      const response = await axios.post("/api", { });
      await axios.get("/api", {});
      form.reset();
      router.push("/dashboard")
      toast({
        title: "Success!",
        description: "Your entry was submitted",
      })

    } catch(error: any){
      console.error("API Request Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting your entry. Please try again.",
        duration: 5000,
      });
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
        {/* Animations */}
        <motion.div
          viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              y: -50,
            },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.50,
                type: "spring",
              },
            },
          }}
          className=" mx-auto md:p-4 p-2 rounded-lg w-4/5 bg-white/10 backdrop-blur-sm"
        >
          <div className="items-center justify-center p-4">
            <p className={`${mainTitle.className} text-3xl md:text-4xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-700 to-purple-700`}>Add Entry</p>
            <div className=" text-left">
                  <SubmitWorkout />
            </div>
            </div>
        </motion.div>
      </div>
  );
}