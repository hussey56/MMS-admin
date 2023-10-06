import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons'
const Trow = (props) => {
  const {data,update} = props
  const {_id,name,price100,price200,price400,price600,last_updated,color,perday,perhour} = data
  const ChangeDate = (dateString)=>{
    const formattedDate = new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    
    });
    return formattedDate
  }
  const deletes = (id)=>{
    props.deletion(id)
  }
  return (
    <>
      <tr>
      <td>{name}</td>
      <td>{price100}</td>
      <td>{price200}</td>
      <td>{price400}</td>
      <td>{price600}</td>
      <td>{perday}</td>
      <td>{perhour}</td>
      <td> <input type="color" value={color} disabled/></td>
      <td>{ChangeDate(last_updated)}</td>
     
      <td>
      <button className='btn  btn-secondary btn-sm' onClick={update} style={{margin:'2px'}}><span><FontAwesomeIcon icon={faEdit} /></span>Edit</button>
         {_id !== '64ce65db2ca0e68c5256363d'&& <>
         <button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>deletes(_id)}><span><FontAwesomeIcon icon={faTrash} /></span>Delete</button>

         </>}

      </td>
   
      </tr>
    </>
  )
}

export default Trow
