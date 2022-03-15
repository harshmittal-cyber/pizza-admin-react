import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from '../redux/actions/userAction'

const HomePage = () => {
  const {user}=useSelector((state)=>state.userReducer)
  const dispatch=useDispatch()
  const submit=()=>{
    dispatch(logout())
  }

  return (
    <div>
      Welcome to {user && user.storeName}
      <button onClick={submit}>Logout</button>
    </div>
  )
}

export default HomePage