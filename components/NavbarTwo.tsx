
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

export const NavbarTwo: FC = () => {
  return (
    <div className=" top-0 w-full h-14 px-4 shadow-sm bg-zinc-800 flex items-center">
        <div className="flex flex-row items-center justify-center gap-4 my-2">
          <Button size="sm" asChild variant="outline" className="hover:drop-shadow-glow text-slate-900">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" variant="outline" className="hover:drop-shadow-glow text-slate-900">
            <Link href="/about"> About </Link>
          </Button>
        </div>
    </div>

  );
};