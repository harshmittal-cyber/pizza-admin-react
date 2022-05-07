import React,{useState,useEffect} from 'react'
import {resetPassword} from '../../redux/actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,Link,useParams} from 'react-router-dom';
import Toaster from '../../utility/Toaster'


const ResetPassword = () => {
    const {message,loading,error}=useSelector((state)=>state.userReducer)
    const {token}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [credential,setCredential]=useState({password:'',confirmpassword:''});
    const [toaster,setToaster]=useState(false)
    const [passworderror,setError]=useState(null) 

    const handleChange=(e)=>{
        setCredential((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    //validation before hiting api
    const resetValidate=()=>{
        let cred=credential.password.trim().length;
        if(cred===0 || credential.confirmpassword.trim().length===0){
            setError('All Fields Required')
            return false
        }else if(cred<8){
            setError('Password Length must be greater than 8');
            return false
        }else if(credential.password!==credential.confirmpassword){
            setError('Confirm Password not matched');
            return false
        }
        return true
    }

    const handleSubmit=()=>{
        if(resetValidate()){
            dispatch(resetPassword(token,credential.password)).then((res)=>{
                setToaster(true);
                setCredential({password:'',confirmpassword:''});
                if(res.success){
                    navigate('/')
                }
            })
        }else{
            displayErrorFunction(null)
        }
    }

    const displayErrorFunction=(message)=>{
        setTimeout(()=>{
            setError(message)
        },3000)

    }
    return (
        <div>
            <div className="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                    <div
                        className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                        <div className="mt-32 mb-20">
                            <h1 className="ls-tight font-bolder display-6 text-white mb-5">Let’s Eat something amazing today.</h1>
                            <p className="text-white text-opacity-80">
                                Maybe some text here will help me see it better. Oh God. Oke,let’s do it then.
                            </p>
                        </div>
                        <div
                            className="w-56 h-56 bg-orange-500 rounded-circle position-absolute bottom-0 end-20 transform translate-y-1/3">
                        </div>
                    </div>
                    <div
                        className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column justify-content-center position-relative">
                        <div className="py-lg-16 px-lg-20">
                            <div className="row">
                                <div className="col-lg-10 col-md-9 col-xl-6 mx-auto ms-xl-0">
                                    <div className="mt-15 mt-lg-5 mb-6 d-lg-block">
                                        <h1 className="ls-tight font-bolder h2">Reset Your Password!</h1>
                                        <span className='text-danger font-sm'>{passworderror!==null && passworderror}</span>
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input
                                            className="form-control" autoComplete="off" 
                                            type="password" name="password" 
                                            value={credential.password} onChange={handleChange}
                                        />
                                    </div>
                                        <div className="mb-5">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                                                </div>
                                            </div>
                                            <input className="form-control" type="password"
                                                name="confirmpassword"
                                                value={credential.confirmpassword} onChange={handleChange}
                                            />
                                        </div>                                   
                                        <div>
                                            <button  className="btn btn-primary w-full" onClick={handleSubmit}>
                                                Reset Password
                                            </button>
                                        </div>
                                    <div className="mt-3 text-center">
                                        <small>Don't havean account?</small> 
                                        <Link to="/signup"
                                            className="text-warning text-sm font-semibold">
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toaster && message && <Toaster text={message} icon={'tick'} showIcon={true} />}
            {toaster && error && <Toaster text={error} icon={'x'} showIcon={true} />}
        </div>
    )
}

export default ResetPassword