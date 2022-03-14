import React,{useState} from 'react'
import {login} from '../../redux/actions/userAction';
import {useDispatch} from 'react-redux';

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const dispatch=useDispatch();

    const submit=(e)=>{
        e.preventDefault();
        dispatch(login({email,password}))
    }

    return (
        <div>
            <input type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Login