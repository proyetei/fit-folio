"use client";

import { FC } from "react";
import { Poppins } from "next/font/google";
interface FooterProps {}
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
const Footer: FC<FooterProps> = ({}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-zinc-900 p-4">
        <p className={`${poppins.className} text-center text-white text-xs`}>
            Made for HawkHacks 2024 | Copyright @{new Date().getFullYear()} Proyetei Akanda 
        </p>
    </div>
    );
};

export default Footer;