import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Profile = () => {
    const [name,setName] = useState('')
    const [id,setId] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState(1)
    const [loading,setLoading] = useState(true)
    const header = useNavigate()
const handleLogout = ()=>{
    localStorage.removeItem('admin_token')
    header('/')
}
    const [formdata,setFormdata] = useState({cpassword:"",cnpassword:"",npassword:""});
  const onChange = (e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
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
      const {name,role,email,_id} = admin
     setId(_id)
     setEmail(email)
     setName(name)
     setPhone(role)
     setLoading(false)
    } catch (error) {
      header('/down')
    }

}
  const HandleUpdate = async(e)=>{
    try {
      e.preventDefault()
      const token = localStorage.getItem('customer_token')
      const request = await fetch(`http://localhost:5000/app/mms/backend/admin/changepasswordadmin/${id}`,{
        method:'PUT',
        headers:{
          'customer_token':token,
          'Content-type':'application/json'
        },
        body:JSON.stringify({oldpassword:formdata.cpassword,newpassword:formdata.npassword})
      })
      const response = await request.json()
      const {error,msg} = response
      if(error===false){
        alert('Password Updated Successfully')
        setFormdata({cpassword:"",cnpassword:"",npassword:""})
  
      }else{
        alert(msg)
        setFormdata({cpassword:"",cnpassword:"",npassword:""})
      }
    } catch (error) {
      header('/down')
    }
   

  }
  useEffect(()=>{
    getData()
  },[phone])
  return (
    <>
      <section>
    <div className="container py-5">
 
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={`https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg`} alt="avatar"
                className="rounded-circle img-fluid"  style={{width: "150px"}}/>
              <h5 className="my-3">{name}</h5>
              <p className="text-muted mb-1">{phone===1?'Super Admin':'Admin'}</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" onClick={handleLogout} className="btn btn-lg btn-outline-dark ms-1">Logout</button>
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-8">
          <div className="card mb-2">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{loading===false?name:'loading...'}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{loading===false?email:'loading...'}</p>
                </div>
              </div>
          

            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">
                <div className="card">
                <h1 className='text-center text-dark font-italic'>Change Password</h1>
                <hr />
                <div className="card-body">
                  <form onSubmit={HandleUpdate}>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Current Password</p>
                </div>
             
                <div className="col-sm-9">
                <input type="password" class="form-control" onChange={onChange} value={formdata.cpassword} name='cpassword' required />

                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">New Password</p>
                </div>
             
                <div className="col-sm-9">
                <input type="password" class="form-control" onChange={onChange} value={formdata.npassword} name='npassword' required/>

                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Confirm New Password</p>
                </div>
             
                <div className="col-sm-9">
                <input type="password" class="form-control" onChange={onChange} value={formdata.cnpassword} name='cnpassword' required />

                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12 text-center">
                  <button className='btn btn-primary' disabled={formdata.npassword!==formdata.cnpassword}  type='submit'>Update Changes</button>
                </div>
              </div>
              </form>
            </div>
                </div>
        


            </div>
          
   
         
            
           
           
          </div>
        </div>
      </div>
    </div>
  </section> 
    </>
  )
}

export default Profile
