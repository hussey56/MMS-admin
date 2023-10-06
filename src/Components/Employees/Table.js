import React, { useEffect, useRef, useState } from 'react'
import Tdata from './Tdata'
import Stats from './Stats';
import { useNavigate } from 'react-router-dom';
const Table = () => {
  const [loading,setLoading] = useState(true);
  const header = useNavigate();
  const Cref = useRef()
  const ref = useRef()
  const Rref = useRef()
  const [data,setData] = useState([]);
  const[formdata,setFormdata] = useState({name:"",gender:"male",dob:'2004-11-06',salary:1000,contact:"",role:"64d0c5501666f6d6632af392",bonus:0})
 
//update form start
const [emp,setEmp] = useState({id:"",name:"",gender:"",dob:'',salary:1000,contact:"",role:"",bonus:0});

const editEmployee = async(id,name,gender,dob,salary,contact,roleid,bonus)=>{
  try {
    const admin = localStorage.getItem('admin_token');
const request = await fetch(`http://localhost:5000/app/mms/backend/employees/singleemployee/update/${id}`,{
  method:'PUT',
  headers:{
    'Content-type':'application/json',
    'admin_token':admin,
  },
  body:JSON.stringify({name:name,gender:gender,password:"12345",dob:dob,salary:salary,phone:contact,role_id:roleid,bonus})
});
const response = await request.json();
  } catch (error) {
   header('/down') 
  }

// console.log(response)

}
    const updateEmployee =async (currentEmployee)=>{
ref.current.click();
const defaultDate = new Date(currentEmployee.dob);
const formattedDate = defaultDate.toISOString().split("T")[0];
setEmp({id:currentEmployee._id,name:currentEmployee.name,gender:currentEmployee.gender,dob:formattedDate,salary:currentEmployee.salary,contact:currentEmployee.phone,role:currentEmployee.role_id,bonus:currentEmployee.bonus});


    }
    const editClick = (e)=>{ // submiting the form
e.preventDefault();//prevent to reload
editEmployee(emp.id,emp.name,emp.gender,emp.dob,emp.salary,emp.contact,emp.role,emp.bonus);
// setNote({id:"",etitle:"",edescription:"",etag:""});
Rref.current.click();
// alert("Employee Data Updated successfully");

    }
    const UonChange = (e)=>{
        setEmp({...emp, [e.target.name]: e.target.value}); // taking value by name attribute and putting into an new array 
            }
//update form end 


const HandleForm = async (e)=>{
  e.preventDefault()
  try {
    const admin = localStorage.getItem('admin_token')
    const request = await fetch('http://localhost:5000/app/mms/backend/employees/newamployee/admin',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'admin_token': admin,
      },
      body:JSON.stringify({name:formdata.name,gender:formdata.gender,password:"12345",dob:formdata.dob,phone:formdata.contact,salary:formdata.salary,role_id:formdata.role,bonus:formdata.bonus})
    })
    const response = await request.json()
  const {msg,error} = response
  if(error===false){
    Cref.current.click();
   setData(data.concat(msg))
  setFormdata({name:"",gender:"male",dob:'2004-11-06',salary:1000,contact:"",role:"64bbde3b47c3d9bfa18cf297"})
   
  }else{
    alert(msg)
  }
  } catch (error) {
    header('/down')
  }

}
const onChange = (e)=>{
  setFormdata({...formdata,[e.target.name]:e.target.value})
}
  const [roles,setRoles] = useState([]);
  const fetchRoles = async()=>{
    try {
      const request = await fetch('http://localhost:5000/app/mms/backend/employees/roles/roles/list',{
      method:'GET'
    });
    const response = await request.json();
    const {Roles} =response
    setRoles(Roles) 
    } catch (error) {
     header('/down') 
    }
  }
  const fetchEmployees = async()=>{
    try {
      const adminId = localStorage.getItem('admin_token')
      const request = await fetch('http://localhost:5000/app/mms/backend/employees/employeelist/admin',{
        method:'GET',
        headers:{
          'admin_token':adminId,
        }
      });
      const response = await request.json();
      const {Employees} = response
      setData(Employees)
      setLoading(false)
    } catch (error) {
     header('/dowm') 
    }
 
  }
  const DeleteEmployee = async(id)=>{
    const result = window.confirm("Are you sure you want to delete the employee?");
    if(result){
      try {
        const admin = localStorage.getItem('admin_token')
      const request = await fetch(`http://localhost:5000/app/mms/backend/employees/singleemployee/delete/${id}`,{
        method:'DELETE',
        headers:{
          'admin_token':admin
        },
      });
      const response = await request.json()
      // eslint-disable-next-line
      const {success} = response 
     
      const newList = data.filter((note)=>{
        return note._id !== id;
        });
        setData(newList)
        alert('Employee Deleted Successfully')
      } catch (error) {
        header('/down')
      }
      
    }
 
  }
  useEffect(()=>{
fetchEmployees()
fetchRoles()
  },[data])
  return (
    <>


    <Stats data={data}/>
    <button className='btn btn-success d-none' type='button' ref={ref} data-toggle="modal" data-target="#modal-update">Update Employee</button>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Employees Information - <button className='btn btn-success' type='button' data-toggle="modal" data-target="#modal-default">Add New Employee</button></h3> 
              </div>
              <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Salary</th>
                    <th>Bonus(PKR) Status</th>
                    <th>Actions</th>
                    
                  </tr>
                  </thead>
                  <tbody>
                    {loading === true && <tr>
                      <td colSpan={8} className='text-center'>Loading...</td></tr>}
                      {loading === false && <>
                        {data.length !== 0 && <>
                  {data.map((dt)=>{
         return    <Tdata key={dt._id} data={dt} DeleteEmployee={DeleteEmployee} update={()=>updateEmployee(dt)}/>
               })}
                </>}
                      </>}
              
              
              
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Role</th>

                    <th>Salary</th>
                    <th>Bonus(PKR)</th>

                    <th>Actions</th>
                  </tr>
                  </tfoot>
                </table>
              </div>
             
            </div>
            </div>
            </div>
            <div className="modal fade" id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Employee</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandleForm}>
            <div className="modal-body">
             

            
            <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" name="name" value={formdata.name} onChange={onChange} className="form-control" id="name" placeholder="Enter Enplyee Name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Gender</label>
                    <select name="gender" defaultValue={formdata.gender} onChange={onChange}  className="form-control" id="gender" required>
                     
                      <option value="male">male</option>
                      <option value="female">female</option>
                      
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Age</label>
                    <input type="date" value={formdata.dob} onChange={onChange}  name="dob" className="form-control" id="dob" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Salary</label>
                    <input type="salary"  min={1000} name="salary" value={formdata.salary} onChange={onChange} className="form-control" id="salary" placeholder="Enter Salary" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Employee Contact</label>
                    <input type="text" name="contact" value={formdata.contact} onChange={onChange} className="form-control" id="contact" placeholder="Enter Contact" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Employee Role</label>
                    <select name="role"  className="form-control"onChange={onChange} id="role" defaultValue={formdata.role} required={true}>
{roles.length !==0 && 
<>
{roles.map((role)=>{
  return <option key={role._id} value={role._id}>{role.name}</option>
})}

</>}
                   
                  
                     
                    </select>
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
      <div className="modal fade" id="modal-update">
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
                    <input type="text" name="name" value={emp.name} onChange={UonChange} className="form-control" id="name" placeholder="Enter Employee Name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Gender</label>
                    <select name="gender" value={emp.gender} onChange={UonChange}  className="form-control" id="gender" required>
                     
                      <option value="male">male</option>
                      <option value="female">female</option>
                      
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Age</label>
                    <input type="date" defaultValue={emp.dob} onChange={UonChange}  name="dob" className="form-control" id="dob" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Employee Salary</label>
                    <input type="number"  name="salary" min={1000} value={emp.salary} onChange={UonChange} className="form-control" id="salary" placeholder="Enter Salary" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Employee Contact</label>
                    <input type="text" name="contact" value={emp.contact} onChange={UonChange} className="form-control" id="contact" placeholder="Enter Contact" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Employee Role</label>
                    <select name="role"  className="form-control" onChange={UonChange} id="role" value={emp.role} required={true}>
{roles.length !==0 && 
<>
{roles.map((role)=>{
  return <option key={role._id} value={role._id}>{role.name}</option>
})}

</>}
                   
                  
                     
                    </select>
                  </div>
                  
            </div>

            <div className="modal-footer justify-content-between">
              <button type="button" ref={Rref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Register</button>
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

export default Table
