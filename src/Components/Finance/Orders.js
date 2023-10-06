import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Trow from './Trow'
const Orders = () => {
  const [loading,setLoading] = useState(true);
  const header = useNavigate();
  const [data,setData] =useState([])
  let ce =1
  const FetchTable = async()=>{
    try {
      const admin = localStorage.getItem('admin_token')
      const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getallapprovedreservations/admin',{
        method:'GET',
        headers:{
          'admin_token':admin,
        }
      });
      const response = await request.json();
      const {data,error,msg} =response
      if(error===false){
        setData(data)
        setLoading(false)
      }else{
        alert(msg)
      }
    } catch (error) {
     header('/down') 
    }

  }
  useEffect(()=>{
    FetchTable()
  },[])
  return (
    <>
     <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <div className="card card-info">
              <div className="card-header ">
                <h3 className="card-title">Approved Order's History</h3>
              </div>
       
              <div className="card-body p-0">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th >#</th>
                      <th>Event Name</th>
                      <th>Event Type</th>
                      <th>People</th>
                      <th>Hall Expense (PKR)</th>
                      <th>Tax 3%(PKR)</th>
                      <th>Gross Profit (PKR)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                     {loading === true && <tr>
                      <td colSpan={8} className='text-center'>Loading...</td>
                      </tr>}
                    {loading === false && <>
                      {data.length !==0 &&data.map((dt)=>{
                  return <Trow key={dt._id} data={dt} count={ce++}/>
                })}
                    </>}
              
                  </tbody>
                </table>
              </div>
             
            </div>
            </div>
            </div>  
        
        </div> 
    </>
  )
}

export default Orders
