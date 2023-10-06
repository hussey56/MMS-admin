import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Content = () => {
  const header  = useNavigate()

  const [loading,setLoading] = useState(true);
  const [st,setSt] = useState(1)
  const getData = async()=>{
    try {
      const token =  localStorage.getItem('admin_token');
      const request = await fetch('http://localhost:5000/app/mms/backend/admin/admindata',{
          method:'GET',
          headers:{
              'admin_token':token,
          }
      });
      const response = await request.json();
      const {admin} = response
      const {role} = admin
      setSt(role) 
    } catch (error) {
      header('/down');
    }
      
  }
const[errormsg,setErrorMsg] = useState('');
    const [cpass,setCpass] = useState('');
    const OnPass = (e)=>{
      setCpass(e.target.value)
    }
const [data,setData]  =useState({name:"",email:"",password:""});
const onChange = (e)=>{
  setData({...data,[e.target.name]:e.target.value})
}
    const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        const request = await fetch('http://localhost:5000/app/mms/backend/admin/createadmin/new',{
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({name:data.name,email:data.email,password:data.password,role:2})
        });
        const response = await request.json();
        const {error,msg} = response
        if(error===true){
setErrorMsg(msg)
        }
        else if(error===false){
          setErrorMsg('Registered Successfully')
   setData({name:"",email:"",password:""})
   setCpass('')
        }
      } catch (error) {
       header('/down') 
      }
       
    }
    useEffect(()=>{
      getData()
      if(st !== 1){
header('/')
      }
    },[st])
  return (
    <>
      <section className="content">
      <div className="container-fluid">
        <div className="row">
          {/* left column */}
          <div className="col-md-12">
            {/* jquery validation */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Sign Up</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form id="quickForm" onSubmit={handleSubmit}>
                <div className="card-body">
                <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <input type="text" name="name" className="form-control" onChange={onChange} value={data.name} id="name" placeholder="Enter Username"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" className="form-control" onChange={onChange} value={data.email} id="email" placeholder="Enter email" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" onChange={OnPass} value={cpass} className="form-control" id="cpassword" placeholder="Confrim Password" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={onChange} value={data.password} className="form-control" id="password" placeholder="Password" required/>
                  </div>
              
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary" disabled={data.password!==cpass}>Register</button>
                  <button type='reset'  style={{display:'none'}}></button>
                  {data.password!==cpass && <>
                  <p className='text-center'>Passwords Don't matches</p>
                  </>}
                  {errormsg.length !==0 &&<>
                  <p className='text-info text-center'>{errormsg}</p>
                  </>}
                </div>
              </form>
            </div>
            {/* /.card */}
            </div>
          {/*/.col (left) */}
          {/* right column */}
          <div className="col-md-6">

          </div>
          {/*/.col (right) */}
        </div>
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </section>  
    </>
  )
}

export default Content
