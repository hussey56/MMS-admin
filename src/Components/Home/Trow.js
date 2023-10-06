import React from 'react'

const Trow = (props) => {
    const {data} = props
    const {
        reservator_name,guests,event,event_type} = data
        const formatDate = (date) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date(date).toLocaleDateString(undefined, options);
            return formattedDate;
          };
  return (
    <>
      <tr>
<td>{reservator_name}</td>
<td>{guests}</td>
<td>{event_type}</td>
<td>{formatDate(event.start)}</td>
      </tr>
    </>
  )
}

export default Trow
