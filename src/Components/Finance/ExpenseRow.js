import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons'
const ExpenseRow = (props) => {
    const {data,update} = props
    const {values,month,year} = data
  return (
    <>
     <tr>
                
                {values.map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
               
                <td>{month}</td>
                <td>{year}</td>
                <td>
                <button className='btn  btn-warning btn-sm' onClick={update} style={{margin:'2px'}}><span><FontAwesomeIcon icon={faEdit}  /></span>Update</button>
       

                </td>
                  </tr> 
    </>
  )
}

export default ExpenseRow
