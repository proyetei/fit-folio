"use client"
import { mainTitle } from "@/fonts/font"
import Display from "./Display"
import { Entry } from "@prisma/client"
import { Suspense } from "react"
import LoadingAnimation from "./LoadingAnimation"
interface DisplayProps {
    params: Entry[],
}

const Dashboard: React.FC<DisplayProps> = ({params}) => {
    return(
        <div className="min-h-screen py-8 px-4">
        <div className=" text-slate-100 flex items-center justify-center">
            <div className="flex flex-col gap-4">
                <div className="py-6">
                <p className={`${mainTitle.className} text-3xl md:text-5xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-700 to-purple-700 py-2`}> Workout History </p>
                <hr />
                <div className="py-4">
                <Display params={params}/>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Dashboard