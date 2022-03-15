import React,{useState,useEffect} from 'react'
import {login} from '../../redux/actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {clearerror} from '../../redux/actions/userAction';
import {useNavigate,Link} from 'react-router-dom'


const Login = () => {
    const {loading,error,isAuthenticated}=useSelector((state)=>state.userReducer)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginerror,setLoginError]=useState()
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const submit=()=>{
        dispatch(login({email,password}))
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoginError('')
            if(error) dispatch(clearerror())
        },3000)

        if(isAuthenticated){
            navigate('/')
        }
    },[error,loginerror,isAuthenticated])

    return (
        <div>
        <div className="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
                <div
                    className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                    <a className="d-block" href="#"><img src="https://clever-dashboard.webpixels.work/img/logos/clever-light.svg" className="h-10" alt="..." /></a>
                    <div className="mt-32 mb-20">
                        <h1 className="ls-tight font-bolder display-6 text-white mb-5">Let’s build something amazing today.</h1>
                        <p className="text-white text-opacity-80">Maybe some text here will help me see it better. Oh God. Oke,
                            let’s do it then.</p>
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
                                    <h1 className="ls-tight font-bolder h2">Nice to see you!</h1>
                                    <span className='text-danger mt-2'>{error}</span>
                                </div>
                                    <div className="mb-5"><label className="form-label" htmlFor="email">Email</label> <input
                                            className="form-control" autoComplete="off" type="text" name="username" onChange={(e)=>setEmail(e.target.value)} /></div>
                                    <div className="mb-5">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div><label className="form-label" htmlFor="password">Password</label></div>
                                            <div className="mb-2"><Link to="/forgotpassword"
                                                    className="text-sm text-muted text-primary-hover text-underline">Forgot
                                                    password?</Link></div>
                                        </div><input className="form-control" type="password"
                                    name="password" onChange={(e)=>setPassword(e.target.value)}
                                            />
                                    </div>
                                    {/* <div><span className='text-danger'>{error}</span></div> */}
                                    <div className="mb-5">
                                        <div className="form-check"><input className="form-check-input" type="checkbox"
                                                name="check_example" id="check_example" /> <label className="form-check-label"
                                                htmlFor="check_example">Keep me logged in</label></div>
                                    </div>
                                   
                                    <div>
                                        <button onClick={submit} disabled={email.length<1 || password.length<1} className="btn btn-primary w-full">
                                            Sign in
                                        </button>
                                    </div>
                                <div className="mt-3 text-center"><small>Don't have
                                an account?</small> <Link to="/signup"
                                className="text-warning text-sm font-semibold">Sign up</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login