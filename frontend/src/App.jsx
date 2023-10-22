import {Routes, Route, Link} from "react-router-dom"
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container mx-auto p-6">
                    <Link to="/"><h1 className="text-white text-3xl font-bold">SideApp v1 </h1></Link>
                </div>
                
            </nav>

            <div className="contain mx-auto p-2 h-full">
                <Routes>
                    <Route index element={<HomePage/>}></Route>
                    <Route path="/create" element={<CreateTaskPage/>}></Route>
                    <Route path="/edit/:id" element={<EditTaskPage/>}></Route>
                </Routes>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default App;