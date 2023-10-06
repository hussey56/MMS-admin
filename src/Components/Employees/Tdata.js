import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons'

const Tdata = (props) => {
    const {data,update} =props
 
    const {name,gender,dob,phone,role_id,salary,_id,bonus} = data
const [role,setRole] = useState('')
const deletes = (did)=>{
  props.DeleteEmployee(did);
}
    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
  
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age -= 1;
      }
  
      return age;
    };
    const Rolename = async(aid)=>{
      const request = await fetch('http://localhost:5000/app/mms/backend/employees/roles/roles/name',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({id:aid}),
      });
      const response = await request.json();
      const {Role} = await response
      const {name} = Role
    setRole(name)
    }
    const UpdateBonus = async(id,bonus)=>{
      const admin = localStorage.getItem('admin_token')
      const request = await fetch('http://localhost:5000/app/mms/backend/employees/grantbonusemployee',{
        method:'POST',
        headers:{
          'admin_token':admin,
          'Content-type':'application/json'
        },
        body:JSON.stringify({id:id,bonus:bonus})
      })
      const response = await request.json()
      const {error,msg} =response
      if(error===false){
        // alert('Bonus Granted')
        console.log('bonus granted')
      }else{
        alert(msg)
      }
    }
    const [value,setValue] = useState(10)
    const onChange = (e)=>{
      setValue(e.target.value)
    }
    const HandleBonus = async(e)=>{
      e.preventDefault();
      UpdateBonus(_id,value)
      alert('Bonus Granted')
    }
    useEffect(()=>{
      Rolename(role_id)
     
    },[role_id])
  return (
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{calculateAge(dob)}</td>
      <td>{phone}</td>
      <td>{role}</td>
      <td>{salary}</td>
     {bonus === 0 &&
      <td>
<form onSubmit={HandleBonus}>
      <input type="number" min={10} name="value" onChange={onChange} value={value}   />
      <button className='btn  btn-success btn-sm' style={{margin:'2px'}} type='submit'>Grant</button>
      </form>
      </td>
     }
     {bonus !== 0 && <>
      <td>

<button className='btn  btn-success btn-sm' style={{margin:'2px'}}>Granted {bonus} pkr</button>
<button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>UpdateBonus(_id,0)}>Cancel Bonus</button>

</td>
     </>}
  
      <td>
      <button className='btn  btn-secondary btn-sm' style={{margin:'2px'}}><span><FontAwesomeIcon icon={faEdit} onClick={update} /></span>Edit</button>
         
         <button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>deletes(_id)}><span><FontAwesomeIcon icon={faTrash} /></span>Delete</button>

      </td>
    </tr>
  )
}

export default Tdata
