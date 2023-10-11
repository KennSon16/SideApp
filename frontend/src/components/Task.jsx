import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";


const Task = ({task, getTasks}) => {
    
    const deleteTask = async (id) => {
        const result = await Swal.fire({
            title: "Do you really want to delete Task?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        })
        if(result.isConfirmed){
            try {
                await axios.delete(`${VITE_BACKEND_URL}/api/tasks/${id}`);
                toast.success("Delete a task successfully")
                getTasks();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return(
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{task.name}</h2>
                <div className="text-sm ml-2">~{task.description}~</div>
                <div className="mt-2 flex px-3">
                    <div className="mt-2 flex gap-4">
                        <Link to={`/edit/${task._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                        <button onClick={() => deleteTask(task._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Task;