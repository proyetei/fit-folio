"use client"
import React, {useState} from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import { UserButton} from "@clerk/nextjs";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarVariants = {
    hidden: {
        y: "-100%",
        opacity: 0,
        transition: {
            delay: 0.5,
        },
    },
    show: {
        y: 0,
        opacity: 1,
        duration: 0.3,
    },
};
return (
    <header className="relative z-50">
      <div className="flex items-center justify-between py-3 bg-slate-900 shadow-md">
        <div className="hover:underline px-4 flex flex-row gap-2 items-center justify-center">
          <UserButton afterSignOutUrl="/" />
        </div>
        {/* Hide the hamburger menu icon on medium size devices*/}
      <div className="md:hidden">
      <button className="px-4 py-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ?
            <X className="hover:scale-110" size={25} color="white" /> : <Image src="/hamburgermenu.svg" alt="Hamburger menu" height={35} width={35} />}
        </button>
      </div>
            {/* Make the links visible when the menu is togged open on mobile devices*/}
            <div className={`absolute top-full left-0 w-full bg-slate-900 shadow-md md:shadow-none md:relative md:top-auto md:w-auto md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"} md:flex`}>
        {/* Navigation Links */}
        <nav>
          <ul className="flex flex-col md:flex-row text-[1rem] font-medium text-slate-100 gap-5 md:gap-5 p-5 md:px-8 md:py-0">
            {links.map((link) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                variants={sidebarVariants}
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link href={`/${link.hash}`}>
                  <div
                    className=
                      {` flex w-full items-center justify-center hover:text-blue-400 transition cursor-pointer hover:scale-125 ${
                        pathname === `/${link.hash}` ? 'underline' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      </div>
    </header>
  );
}