import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { NavbarTwo } from "@/components/NavbarTwo";
import { redirect } from "next/navigation";
import Features from "@/components/Features";
import { newUser } from "@/lib/newUser";
export default async function LandingPage(){
  const user = await newUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
        <Landing />
        <Features />
        <Footer />
    </div>
  )
}
