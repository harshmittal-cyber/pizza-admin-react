import React,{useState} from 'react'
import {register} from '../../redux/actions/userAction';
import {useDispatch} from 'react-redux';

const Signup = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [storeName,setStoreName]=useState();

    const dispatch=useDispatch();

    const submit=(e)=>{
        e.preventDefault();
        dispatch(register({email,password,storeName}))
    }
    return (
        <div>
            <input type='email' onChange={(e)=>setEmail(e.target.value)}/>
            <input  type='text' onChange={(e)=>setStoreName(e.target.value)}/>
            <input  type='password' onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={submit}>Register</button>
        </div>
    )
}

export default Signup