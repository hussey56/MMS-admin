import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons'
const Item = (props) => {
  const {update} = props
  const deleted = async(id)=>{
    props.Deletebutton(id);
  }
    const {data}= props
    const {name,email,role,_id} = data
  return (
    <>
       <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role===1?"Super Admin":"Admin"}</td>
     
      <td>
      <button className='btn  btn-secondary btn-sm' onClick={update} style={{margin:'2px'}}><span><FontAwesomeIcon icon={faEdit}  /></span>Edit</button>
         
         <button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>deleted(_id)} ><span><FontAwesomeIcon icon={faTrash} /></span>Delete</button>

      </td>
    </tr>
    </>
  )
}

export default Item
