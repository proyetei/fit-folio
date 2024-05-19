'use client'

import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { motion } from "framer-motion";



export default function Features() {
  return (
    <div className="px-8 ">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-md py-8 mb-8 bg-zinc-800/40"
    >
      <h3 className="text-center text-5xl text-cyan-100">Features</h3>
      <div className="mx-8 mt-10 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-5">
        <Accordion
          type="single"
          collapsible
          className="mb-8 h-fit w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-5"
        >
          <AccordionItem value="1">
            <AccordionTrigger>
              <div>
                <h1 className=" text-left text-lg font-bold">
                Personalized Workout and Health Management
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="flex flex-col gap-6 text-xl text-slate-100">
              FitFolio is an innovative full-stack application that allows users to provide their workout information such as the workout name, the reps and sets that they did and a title for the post.
                <p className="">
                Users can submit multiple workouts in one post. Users can also view workout entries on their dashboard, edit, delete and create as many workout entries they want. The workout information of each user then gets stored in the backend for the AI to analyze reports based on the user workout history.
                </p>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          className="mb-8 h-fit w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-5"
        >
          <AccordionItem value="2">
            <AccordionTrigger>
              <div>
                <h1 className=" text-left text-lg font-bold">
                AI-Powered Fitness Guidance
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="flex flex-col gap-6 text-lg text-slate-100">
              The AI compares all the workout history in the database, and then analyzes the texts to perform the following:
                <p> - Critiques the fitness on their workout history and then gives suggestions for improvements.</p>
                  <p> - Analyzes all the entries and texts of the workout names and its corresponding reps and set to tell the user what muscle they should workout more</p>
                  <p> - Tells the user what workouts they should do more to target the specific muscles listed above
                </p>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          className="mb-8 h-fit w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-5"
        >
          <AccordionItem value="1">
            <AccordionTrigger>
              <div>
                <h1 className=" text-left text-xl font-bold">
                Plan your gym sessions with AI
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="flex flex-col gap-6 text-xl font-light text-slate-100"> Allow users to ask the AI to generate a comprehensive workout plan for their next gym session. 
                <p className="">
                These reports can help users understand their progress, lead them to the right direction in their fitness journey by identifying areas for improvement, and maintain motivation by providing comprehensive workout routines.
                </p>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
    </div>
  );
};