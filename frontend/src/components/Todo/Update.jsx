import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

function Update({ display, update }) {

    const [inputs, setInputs] = useState({ title: "", body: "" });

    useEffect(() => {
        if (update) {
            setInputs({ title: update.title, body: update.body });  // Correctly initialize with provided update data
        }
    }, [update]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const submit = async () => {
        try {
            const response = await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, inputs);
            toast.success(response.data.message);
            display('none');
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task");
        }
    }

    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column'>
            <h3>Update Your Task</h3>
            <input type="text" className='todo-inputs my-4 w-100 p-3' value={inputs.title} name='title' onChange={change} />
            <textarea className='todo-inputs w-100 p-3' value={inputs.body} name='body' onChange={change} />
            <div>
                <button className='btn btn-dark my-4' onClick={submit}>UPDATE</button>
                <button className='btn btn-danger my-4 mx-3' onClick={() => { display('none') }}>Close</button>
            </div>
        </div>
    )
}

export default Update;
