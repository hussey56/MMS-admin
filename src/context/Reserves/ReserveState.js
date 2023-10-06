import React, { useState } from 'react'
import ReserveContext from './ReserveContext'

const ReserveState = (props) => {
    const [pro,setPro] = useState([]);
    const[dl,setDl] = useState(0)
    const LoadData = async()=>{
        const token = localStorage.getItem('admin_token')
const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getallreservations/admin',{
    method:'GET',
    headers:{
        'admin_token':token,
    },
});
const response = await request.json();
const {reserves,total} = await response
setPro(reserves)
setDl(total)
    }
  return (
    <ReserveContext.Provider value={{pro,dl,LoadData}}>
      {props.children}
    </ReserveContext.Provider>
  )
}

export default ReserveState
