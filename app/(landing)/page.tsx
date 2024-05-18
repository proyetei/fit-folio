import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs/server";
import { SignedOut } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import { NavbarTwo } from "@/components/NavbarTwo";
import { redirect } from "next/navigation";
const LandingPage = () => {
  // const {userId} = auth();
  // if (userId){
  //   return redirect("/dashboard")
  // }
  return (
    <div>
        <Landing />
        <Footer />
    </div>
  )
}
export default LandingPage;