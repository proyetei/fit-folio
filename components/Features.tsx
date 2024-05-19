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
              hellos
                <p className="">
                  ...
                </p>
                ...
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
                ...
                <p className="">
                  ...
                </p>
                ...
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
              <p className="flex flex-col gap-6 text-xl font-light text-slate-100">
                ..
                <p className="">
                  ...
                </p>
                ...
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
    </div>
  );
};