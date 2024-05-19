"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { logo } from "@/fonts/font";
import { motion } from "framer-motion";
import LandingText from "./LandingText";
import Image from "next/image";
import Features from "./Features";

export default function Landing() {
  return (
    <div className="py-24 flex items-center justify-center relative">
      {/* Content */}
      <div className="w-10/12 items-center bg-zinc-700/40 backdrop-blur-sm p-8 rounded-xl shadow-lg relative z-10 hover:drop-shadow-glow">
        <motion.div
          viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              x: -300,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                type: "spring",
              },
            },
          }}
          className="flex w-full flex-col items-center gap-4 text-zinc-800 relative z-10"
        >
            <p className={`${logo.className} md:text-7xl text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-400 to-purple-600 z-10`}>
              FitFolio
            </p>
          <LandingText />
          <Button className=" hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600" size="lg" asChild>
            <Link href="/sign-in">Log in to explore</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}