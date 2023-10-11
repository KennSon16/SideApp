import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreateTaskPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveTask = async (e) => {
        e.preventDefault();
        if(name === "" || description === "") {
            alert('Please fill out all inputs completely')
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}/api/tasks`, {name: name, description: description, completed: false})
            // alert(`Save ${response.data.name} successfully`)
            toast.success(`Save ${response.data.name} successfully`)
            setIsLoading(false)
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a Task
            </h2>
            <form onSubmit={saveTask}>
                <div className="space-y-2">
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Description" />
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600">Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTaskPage;