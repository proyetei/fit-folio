import { Entry } from "@prisma/client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { prettyDate } from '@/lib/prettyDate';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoadingAnimation from "./LoadingAnimation";
import DeleteButton from "./DeleteButton";
interface DisplayProps {
    params: Entry[]
}
const Display: React.FC<DisplayProps> = ({params}) => {
    const [workouts, setWorkout] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchWorkout = async () => {
          setIsLoading(true)
          try {
            const response = await axios.get('/api/submit', {});
            setWorkout(response.data);
          } catch (error) {
            console.error("Error fetching workout entry:", error);
          } finally{
            setIsLoading(false)
          }
        };
        fetchWorkout();
      }, []);
      const reversedWorkout = [...workouts].reverse()
    return(
        <div className="items-center justify-center">
                    {isLoading ? (
                <p className="flex items-center gap-2 text-slate-100">
                Loading... <LoadingAnimation />
                </p>
            ) : (
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-2 gap-1'>
              {reversedWorkout?.map((eachWorkoutEntry, index) => { 
              const creationDate = eachWorkoutEntry?.createdAt
              // destructure the type as arrays of objects
              const workoutInfo = eachWorkoutEntry?.allWorkouts as Array<{ workoutNames: string; repAndSet: string }>;
              if (!workoutInfo || workoutInfo.length === 0) {
                return (
                  <p key={index} className="flex items-center gap-2 text-slate-100">
                    No workout found.. Click the add workout button to add one!
                  </p>
                );
              } else {
              return (
              <Card key={index}>
                <div className="border rounded-xl"> 
                <CardHeader>
                  <CardTitle>
                    <p className={` text-base text-wrap`}> {eachWorkoutEntry && creationDate ? ` ${eachWorkoutEntry.title} `: 'Workout info'}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className=' min-h-[100px] text-slate-200 p-4'>
                <Table>
        <TableCaption>
          <hr/>
          <p className="py-2"> {eachWorkoutEntry && creationDate ? `Workout date: ${prettyDate(new Date(creationDate).toISOString())}`: ''}</p>
          <hr/>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Workout name </TableHead>
            <TableHead> Sets </TableHead>
          </TableRow>
        </TableHeader>
        {/* keep track of current workout index, save in a variable, and map over that */}
        <TableBody>
          {workoutInfo.map((eachWorkout, j) => (
            <TableRow key={j}>
              <TableCell>{eachWorkout.workoutNames}</TableCell>
              <TableCell>{eachWorkout.repAndSet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
                </CardContent>
              <CardFooter>
              {/* <div className='flex flex-row gap-4'>
                  {entry && <DeleteButton post = {entry}/>}
                {entry && <EditButton post={entry} />}
                </div> */}
                <div className="flex items-center justify-center p-4">
                  {<DeleteButton workout = {eachWorkoutEntry} /> }
                </div>
              </CardFooter>
              </div>
              </Card>
            ); }
        })}
        </div>
       )}
      </div>
    )
}

export default Display