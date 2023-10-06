import React, { useState ,useEffect } from 'react'
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Utilities/Loader';

const Content = () => {
 const [loading,setLoading] = useState(true);
 const header =useNavigate();
  const [pro,setPro] = useState([]);
  const[dl,setDl] = useState(0)
  const LoadData = async()=>{
    try {
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
      setLoading(false);
    } catch (error) {
      header('/down');
    }
    
  }
  useEffect(()=>{
   
    LoadData()
  },[pro])
  return (
    <>
          <div className='content'>
      <div className="row">
        {loading === true && <>
      <div className="col-12">
        <p className="text-center">loading...</p>
      </div>
        </>}
        {loading === false && <>
          {dl !==0 && <>
        {pro.map((dt)=>{
          return <Card key={dt._id} data={dt}/>
        })}
        </>}
        </>}
      
  
     
      </div>
      </div>
    </>
  )
}

export default Content
