import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Rdata from './Rdata';

const Roles = () => {
  const header = useNavigate();
  const [loading, setLoading] = useState(true);
    const [data,setData] = useState([])
    const FetchData = async()=>{
      try {
        const request = await fetch('http://localhost:5000/app/mms/backend/employees/roles/roles/list',{
          method:'GET'
        });
        const response = await request.json();
        const {Roles} =response
        setData(Roles)
        setLoading(false)
      } catch (error) {
        header('/down')
      }
       
    }
    let i =1
    const DeleteRoles = async(id)=>{
        const admin = localStorage.getItem('admin_token')
        const result = window.confirm("Do You Want to delete this Role and Employees with this Role?")
        if(result){
          try {
            const request = await fetch(`http://localhost:5000/app/mms/backend/employees/roles/roles/delete/${id}`,{
              method:'DELETE',
              headers:{
                  'admin_token':admin
              }
          });
          const response = await request.json()
          const {error,msg}= response 
          if(error===false){
              alert('Deleted Successfully')
              const newList = data.filter((note)=>{
                  return note._id !== id;
                  });
                  setData(newList)
          }else{
              alert(msg)
          }
          } catch (error) {
            header('/down')
          }
           
        }

    }
    //add
     const Cref = useRef()
     const [formdata,setFormdata] = useState('')
     const onChange = (e)=>{
        setFormdata(e.target.value)
     }
     const HandleForm = async(e)=>{
        e.preventDefault();
        try {
          const admin = localStorage.getItem('admin_token')
          const request = await fetch('http://localhost:5000/app/mms/backend/employees/roles/create/roles',{
  method:'POST',
  headers:{
      'admin_token':admin,
      'Content-type':'application/json'
  },
  body:JSON.stringify({name:formdata})
          })
          const response = await request.json()
          const {error,msg} = response
          if(error===false){
              alert('successfully added role')
              Cref.current.click()
              setFormdata('')
              
          }else{
              alert('error: '+msg)
              Cref.current.click()
              setFormdata('')
          }
        } catch (error) {
         header('/down'); 
        }
    
     }
     const ref = useRef()
     const Rref = useRef()
     const [uformdata,setuFormdata] = useState('')
     const [uformdataid,setuFormdataid] = useState('')
     const uonChange = (e)=>{
        setuFormdata(e.target.value)
     }
     const updateEmployee =async (currentEmployee)=>{
        ref.current.click();      
        setuFormdata(currentEmployee.name);
        setuFormdataid(currentEmployee._id)
            }
            const EditFunction = async(id,name)=>{
              try {
                const admin = localStorage.getItem('admin_token')
                const request = await fetch(`http://localhost:5000/app/mms/backend/employees/roles/roles/UPDATE/${id}`,{
                    method:'PUT',
                    headers:{
                        'admin_token':admin,
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({name:name})
                })
                const response = await request.json()
                const {error,msg} = response
                if(error===false){
                    alert("Updated Successfully")
                }else{
                    alert(msg)
                }
              } catch (error) {
                header('/down')
              }
               
            }
     const editClick = (e)=>{
e.preventDefault()
EditFunction(uformdataid,uformdata)
Rref.current.click()
     }
    useEffect(()=>{
        FetchData()
    },[data])
  return (
    <>
    <button className='btn btn-success d-none' type='button' ref={ref} data-toggle="modal" data-target="#modal-update-r">Update Employee</button>
         <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Employees Role - <button className='btn btn-success' type='button' data-toggle="modal" data-target="#modal-role">Add New  Role</button></h3> 
              </div>
              <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {loading === true && <>
                    <tr>
                      <td colSpan={3} className='text-center'>Loading...</td>
                    </tr>
                    </>}
                    {loading === false && <>
                      {data.length !== 0 && <>
                  {data.map((dt)=>{

         return   <tr key={dt._id}>
            <td>{i++}</td>
            <Rdata key={dt._id} data={dt} DeleteRoles={DeleteRoles} update={()=>updateEmployee(dt)} />
            </tr>
               })}
                </>}
                    
                    </>}
               
              
              
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                   
                  </tr>
                  </tfoot>
                </table>
              </div>
             
            </div>
            </div>
            </div>
            <div className="modal fade" id="modal-role">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Role</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandleForm}>
            <div className="modal-body">
             

            
            <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" name="name" value={formdata} onChange={onChange} className="form-control" id="name" placeholder="Enter Enplyee Name" required/>
                  </div>
      
            </div>

            <div className="modal-footer justify-content-between">
              <button type="button" ref={Cref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Register</button>
            </div>
            </form>
          </div>
        </div>
      </div>

      {/* Update form starts */}
      <div className="modal fade" id="modal-update-r">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Employee</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={editClick}>
            <div className="modal-body">
             

            
            <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" name="name" value={uformdata} onChange={uonChange} className="form-control" id="name" placeholder="Enter Employee Name" required/>
                  </div>
                 
                  
            </div>

            <div className="modal-footer justify-content-between">
              <button type="button" ref={Rref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Update</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      {/* Update form ends*/}
            </div>  
    </>
  )
}

export default Roles
