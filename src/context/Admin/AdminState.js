import React, { useState } from 'react'
import AdminContext from './AdminContext'

const AdminState = (props) => {

    const [data,setData] = useState(null)
    const getData = async()=>{
        const token =  localStorage.getItem('admin_token');
        const request = await fetch('http://localhost:5000/app/mms/backend/admin/admindata',{
            method:'GET',
            headers:{
                'admin_token':token,
            }
        });
        const response = await request.json();
        const {admin} = response
        const {name} = admin
        setData(name)
    }

  return (
    <AdminContext.Provider value={{data,getData}}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState
