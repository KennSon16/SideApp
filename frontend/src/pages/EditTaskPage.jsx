import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify"
import { VITE_BACKEND_URL } from "../App";

const EditTaskPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState({
        name: "",
        description: "",
    })


    const getTask = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
            setTask({
                name: response.data.name,
                description: response.data.description,
            })
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            toast.error(error.message)
        }

    }

    const updateTask = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await axios.put(`${VITE_BACKEND_URL}/api/tasks/${id}`, task);
            toast.success("Update a task successfully");
            navigate('/');

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getTask();
    }, [])

    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Update a Task
            </h2>
            { isLoading ? ("Loading"): (
                <>
                    <form onSubmit={updateTask}>
                        <div className="space-y-2">
                            <div>
                                <label>Name:</label>
                                <input type="text" value={task.name} onChange={(e) => setTask({...task, name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input type="text" value={task.description} onChange={(e) => setTask({...task, description: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Description" />
                            </div>
                            <div>
                                {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600">Save</button>)}
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default EditTaskPage;