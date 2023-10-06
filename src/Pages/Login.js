import React, { useEffect, useState } from 'react'
import '../Css/Login.css'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const header = useNavigate();
	const [data,setData] = useState({email:'',password:''});
const [message,setMessage] = useState('');
	const onChange =async (e)=>{
		setData({...data,[e.target.name]:e.target.value})
	}
	const [error,setError] = useState(false);
	const handleLogin = async(e)=>{
		e.preventDefault()
     const request = await fetch('http://localhost:5000/app/mms/backend/admin/loginadmin',{
		method:'POST',
		headers:{
			'Content-type':'application/json',
		},
		body:JSON.stringify({email:data.email,password:data.password})
	 }) ;
	 const response = await request.json();
	 const {error,msg,token} = response
	 if(error === false){
		localStorage.setItem('admin_token',token);
		header('/home');
	 } else{
		setError(true)
		setMessage(msg)
	 }

	}
    useEffect(()=>{
        const token = localStorage.getItem('admin_token');
        if(token){
header('/home');
        }
    },// eslint-disable-next-line
    [])
  return (
    <>

      	<div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src={Logo} className="brand_logo" alt="Logo"/>
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={handleLogin}>
						<h2 className='text-center text-light m-2'>ADMIN <span className='text-dark'>LOGIN</span> </h2>
					
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="email" name="email" className="form-control input_user" value={data.email} placeholder="email" onChange={onChange} required/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" name="password" className="form-control input_pass" value={data.password}  onChange={onChange} required placeholder="password"/>
						</div>
					
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="submit" name="button" className="btn login_btn">Login</button>
				   </div>
					</form>
				</div>
		
				<div className="mt-4">
				<div className="d-flex justify-content-center links">
					{error &&<>
					
				<p className='text-danger'>
						Error: <span className='text-light'>{message}</span></p>
						</>}
					</div>
					
				
				</div>
			</div>
		</div>
	</div>
	
    </>
  )
}

export default Login
