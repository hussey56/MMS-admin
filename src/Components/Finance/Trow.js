import React from 'react'

const Trow = (props) => {
  
    const {data,count} = props
    const {_id,event,event_type,price,status,guests} = data
  return (
    <tr>
      <td>{count}</td>
      <td>{event.title}</td>
      <td>{event_type}</td>
      <td>{guests}</td>
      <td>{price}</td>
      <td>{(price/100)*3}</td>
      <td>{price -((price/100)*3)}</td>
      <td> <span className={`badge badge-${status==='completed'?'success':'warning'}`}>{status==='completed'?'done':'undone'}</span> </td>
    </tr>
  )
}

export default Trow
