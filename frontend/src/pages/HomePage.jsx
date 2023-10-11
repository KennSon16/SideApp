import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Task from "../components/Task";
import {VITE_BACKEND_URL} from "../App"

const HomePage = () => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] =useState(false);

    const getTasks = async () => {
        try{

            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}/api/tasks/`);
            console.log(response.data);
            setTasks(response.data);
            setIsLoading(false)

        } catch (error) {
            console.error();
        }
    }

    useEffect(()=> {
        getTasks();
    }, [])

    return(
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {isLoading ? (
                    "Loading. . ."
                ) : (
                    <>
                    {tasks.length > 0 ? (
                        <>
                            {
                                tasks.map((task,index)=> {
                                    return(
                                        <Task key={index} task={task} getTasks={getTasks}/>
                                    )
                                })
                            }
                        </>

                    ) : (
                        <div>
                            there is no task
                        </div>
                    )}
                    </>
                )}
            </div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-8 py-3 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Create a task
                </Link>
            </div>
        </div>
    )
}

export default HomePage;