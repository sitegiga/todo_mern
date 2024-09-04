import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Headingcomp from './headingcomp'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'

function Signin() {

    const dispatch = useDispatch()
    const history = useNavigate()
    const [inputs, setInputs] = useState({email:"",password:""})

    const change = (e) => {
        const {name, value} = e.target
        setInputs({...inputs, [name]:value})
    }
    

    const submit = async (e) => {
        e.preventDefault()
        await axios.post(`${window.location.origin}/api/v1/signin` , inputs).then((response) => {
           sessionStorage.setItem('id', response.data.others._id)
           dispatch(authActions.login())
           history('/todo')
        })
    }

    return (
        <div>
             <div className='signup'>
           <div className="container">
                <div className="row">
                <div className='col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center'>
                        <Headingcomp first="Sign" second="In"/>
                    </div>
                    <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                        <div className='d-flex flex-column w-100 p-3 mt-1'>
                        <input className='p-2 my-3 input-signup' type="email" name='email' placeholder='Enter Your Email' onChange={change} value={inputs.email} />
                        <input className='p-2 my-3 input-signup' type="password" name='password' placeholder='Enter Your password' onChange={change} value={inputs.password} />
                        <button className='btn-signup p-2' onClick={submit}>Sign In</button>
                        </div>
                    </div>
                    
                </div>  
           </div>
        </div>
        </div>
    )
};

export default Signin
