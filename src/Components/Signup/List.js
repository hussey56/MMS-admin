import React, { useEffect, useRef, useState } from 'react'
import Item from './Item';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const header = useNavigate();
  const [loading,setLoading] =useState(true);
    const [data,setData] = useState([]);
    const [aid,setId] = useState('')
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
        const {_id} = admin
       setId(_id)
      } catch (error) {
        header('/down')
      }
  
  }
const [num,setNum] = useState(1);
const OnAdd = ()=>{
  setNum(num+1)
}
    const Deletebutton = async (id)=>{
      try {
        const result = window.confirm("Do You really want to delete this admin")
      if(result){
        const admin = localStorage.getItem('admin_token');
        const request = await fetch(`http://localhost:5000/app/mms/backend/admin/deleteadmin/${id}`,{
          method:'DELETE',
          headers:{
            'admin_token':admin
          }
        });
        const response = await request.json();
        const {error,msg} = response 
        if(error===false){
          let newList = data.filter((note)=>{
            return note._id !== id
          })
          setData(newList)
alert('Deleted Successfully')

        }else{
alert(msg)
        }
      }
      } catch (error) {
        header('/down');
      }
      
    }
    const FetchAdmins = async(id)=>{
      try {
        const admin = localStorage.getItem('admin_token')
        const request = await fetch('http://localhost:5000/app/mms/backend/admin/alladmin',{
            method:'GET',
            headers:{
                'admin_token':admin,
            }
        });
        const response = await request.json();
        const {datar,error,msg} = response
        if(error===false){
          let newList = datar.filter((note)=>{
            return note._id !== id
          })
            setData(newList)
            setLoading(false);
        }else{
            alert(msg)
        }
      } catch (error) {
        header('/down')
      }
    }
    const Oref = useRef()
    const Cref = useRef()
    const[formdata,setFormdata] = useState({id:"",frole:1,fname:"",femail:""});
  
    const EditFunction = async(did,role)=>{
      try {
        const admin = localStorage.getItem('admin_token');
const request = await fetch(`http://localhost:5000/app/mms/backend/admin/updatestatusbysuper/${did}`,{
  method:'PUT',
  headers:{
    'Content-type':'application/json',
    'admin_token':admin,
  },
  body:JSON.stringify({role:role})
})
const response = await request.json();
const {error,msg} = await response
if(error===false){
  alert("Updated Successfully")
  console.log(msg)
}else{
  alert(msg)
}
      } catch (error) {
       header('/down'); 
      }

    }
 const EditClick = async(currentAdmin)=>{
      Oref.current.click();
      setFormdata({id:currentAdmin._id,frole:currentAdmin.role,fname:currentAdmin.name,femail:currentAdmin.email})
      // console.log(formdata.id)
    }
    const RonChange = (e)=>{
      setFormdata({...formdata,[e.target.name]:e.target.value})
    }
    const HandleEdit = async(e)=>{
      e.preventDefault();
      EditFunction(formdata.id,formdata.frole);
      Cref.current.click();
    }
useEffect(()=>{
    FetchAdmins(aid)
    getData()
},[num,aid])
  return (
    <>
       
        <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Admin Information - <button className='btn  btn-info btn-sm' onClick={OnAdd}>Refresh</button> </h3> 
              </div>
              <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    
                    <th>Actions</th>
                    
                  </tr>
                  </thead>
                  <tbody>
                    {loading === true && <>
                    <tr>
                      <td colSpan={4} className='text-center'>loading...</td>
                    </tr>
                    </>}
                    {loading === false && <>
                      {data.length !== 0 && <>
                  {data.map((dt)=>{
         return    <Item key={dt._id} data={dt} Deletebutton={Deletebutton} update={()=>EditClick(dt)}/>
               })}
                </>}
                    </>}
               
              
              
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    
                    <th>Actions</th>
                    
                  </tr>
                  </tfoot>
                </table>
              </div>
             
            </div>
            </div>
            </div>
            <button type="button" ref={Oref} className="btn btn-block btn-warning btn-sm d-none" data-toggle="modal" data-target="#modal-admin"></button>

<div className="modal fade" id="modal-admin">
    <div className="modal-dialog">
      <form onSubmit={HandleEdit}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Update Admin</h4>
          <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <div className="form-group">
                <label htmlFor="Item">Name</label>
                <input type="text" name="fname" value={formdata.fname} disabled required className="form-control" id="fname" placeholder="EnterName"/>
              </div>
              <div className="form-group">
                <label htmlFor="femail">email</label>
                <input type="email"  name="femail" value={formdata.femail} disabled required  className="form-control" id="femail" placeholder="Enter email"/>
              </div> 
        
              <div className="form-group">
              <label htmlFor="frole">Employee Role</label>
                <select name="frole"  className="form-control" onChange={RonChange} id="frole" value={formdata.frole} >

<option  value={1}>Super Admin</option>
<option  value={2}> Admin</option>

                </select>
              </div>
        </div>
        <div className="modal-footer justify-content-between">
          <button type="button" ref={Cref} className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit"  className="btn btn-primary">Update</button>
        </div>
      </div>
      </form>
    </div>
  </div>

  
            </div>  

    </>
  )
}

export default List
