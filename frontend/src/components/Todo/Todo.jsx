import React, { useEffect, useState } from 'react';
import './Todo.css';
import TodoCard from './TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

let id = sessionStorage.getItem('id');

function Todo() {
    const [input, setInputs] = useState({ title: "", body: "" });
    const [array, setArray] = useState([]); // Initialize as an empty array
    const [toUpdate, setToUpdate] = useState(null);  // State for the task to be updated

    const show = () => {
        document.getElementById('text-area').style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...input, [name]: value });
    };

    const submit = async () => {
        if (input.title === "" || input.body === "") {
            toast.error("Title or Body Can't Be Empty");
        } else {
            if (id) {
                try {
                    const response = await axios.post(`${window.location.origin}/api/v2/addTask`, {
                        title: input.title,
                        body: input.body,
                        id: id
                    });
                    console.log(response);
                    setInputs({ title: "", body: "" });
                    toast.success('Your Task Is Added');
                    setArray((prevArray) => [...prevArray, response.data.list]);  // Correctly spread previous state
                } catch (error) {
                    console.error("Error adding task:", error);
                    toast.error("Failed to add task");
                }
            } else {
                setArray((prevArray) => [...prevArray, input]);  // Ensure previous state is an array
                setInputs({ title: "", body: "" });
                toast.success('Your Task Is Added');
                toast.error('Your Task Is Not Saved! Please SignUp First');
            }
        }
    };

    const del = async (Cardid) => {
        if (id) {
            try {
                await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
                    data: { id: id }
                });
                toast.success('Your Task Is Deleted');
                setArray((prevArray) => prevArray.filter(item => item._id !== Cardid));  // Correctly filter previous state
            } catch (error) {
                console.error("Error deleting task:", error);
                toast.error("Failed to delete task");
            }
        } else {
            toast.error('Please Sign Up First');
        }
    };

    const dis = (value) => {
        const element = document.getElementById('todo-update');
        if (element) {
            element.style.display = value;
        } else {
            console.error("Element with ID 'todo-update' not found.");
        }
    };

    const update = (index) => {
        setToUpdate(array[index]);  // Set the task to be updated
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (id) {
                await axios.get(`${window.location.origin}/api/v2/getTask/${id}`)
                    .then((response) => {
                        setArray(response.data.list);
                    })
                    .catch((error) => {
                        console.error("Error fetching tasks:", error);
                        toast.error("Failed to fetch tasks");
                    });
            }
        };
        fetchTasks();
    }, []);  // Removed 'id' from dependency array

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
                    <div className='d-flex flex-column todo-inputs-div w-100 p-1'>
                        <input type="text" placeholder='TITLE' name='title' className='my-2 p-2 todo-inputs' onClick={show} value={input.title} onChange={change} />
                        <textarea id='text-area' type="text" placeholder='BODY' name='body' className='my-2 p-2 todo-inputs' value={input.body} onChange={change} />
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end m-3 '>
                        <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                    </div>
                </div>

                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {array && array.map((item, index) => (
                                <div className='col-lg-3 col-10 mx-lg-5 mx-3 my-2 ' key={index}>
                                    <TodoCard
                                        title={item.title}
                                        body={item.body}
                                        id={item._id}
                                        delid={del}
                                        display={dis}
                                        updateId={index}
                                        toBeUpdate={update}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {toUpdate && (
                <div className='todo-update' id='todo-update'>
                    <div className='container update'>
                        <Update display={dis} update={toUpdate} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Todo;
