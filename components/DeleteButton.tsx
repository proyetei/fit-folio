import { Entry } from "@prisma/client"
import React from "react"
import { FC } from "react"
import axios from "axios"
import { FaTrash } from "react-icons/fa"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { Prisma } from "@prisma/client"
import { db } from "@/lib/db"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, useCallback} from "react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { Button } from "./ui/button"
interface DeleteEntryProps{
    workout: Entry
}
const DeleteButton: React.FC<DeleteEntryProps> = ({ workout }) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const router = useRouter();

    // const currentUser = await getCurrentUser();
    const handleSubmission = useCallback(async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/workout/${workout.id}/`);
            router.refresh();
            toast({ description: "Workout deleted successfully!" });
        } catch (error) {
            console.error("API Request Error:", error);
            toast({
                description: "An error occurred while submitting. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    }, [workout.id, router, toast]);

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={loading}> Delete </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-slate-900">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription> This will permanently delete your workout!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="text-slate-900">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ (handleSubmission)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
export default DeleteButton