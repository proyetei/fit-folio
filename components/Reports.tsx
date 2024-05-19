import GenerateButton from "./GenerateButton";
import { mainTitle } from "@/fonts/font";
export default function Reports(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-slate-900 p-6 rounded-lg w-4/5">
            <p className={`${mainTitle.className} text-center text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Generate workout report </p>
            <GenerateButton />
            </div>
        </div>
    )
}