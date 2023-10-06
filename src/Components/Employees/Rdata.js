import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons'

const Rdata = (props) => {
    const {DeleteRoles,update} =props

    const {name,_id} = props.data
    const deletion = (id)=>{
        DeleteRoles(id)
    }
  return (
    <>
  
      <td>{name}</td>
      <td>        <button className='btn  btn-secondary btn-sm' style={{margin:'2px'}}><span><FontAwesomeIcon icon={faEdit} onClick={update} /></span>Edit</button>
      {_id !== '64d0c5501666f6d6632af392' && <>
      <button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>deletion(_id)}><span><FontAwesomeIcon icon={faTrash} /></span>Delete</button>
      </>}

      </td>
      </>
  )
}

export default Rdata
