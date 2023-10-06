import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
const InventoryOverview = () => {
  const header = useNavigate();
  const [loading,setLoading] = useState(true);
  const [data,setData] =useState([])
  let i =1
  const  GetData = async()=>{
    try {
      const admin = localStorage.getItem('admin_token');
      const request = await fetch('http://localhost:5000/app/mms/backend/inventory/getfiveinventory',{
        method:'GET',
        headers:{
          'admin_token':admin,
        }
      });
      const response = await request.json()
      const {all} = response
      setData(all)
      setLoading(false)
    } catch (error) {
      header('/down');
    }
   
  }
  const calculatePercentage = (totalValue, gainValue) => {
    
     let calculatePercentage = ((gainValue/totalValue)*100).toFixed(0)
     return calculatePercentage
   
  }
  useEffect(()=>{
    GetData()
  },[])
  return (
    <>
        <div className="card">
              <div className="card-header">
                <h3 className="card-title">Inventory Overview</h3>
              </div>
              
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th >#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th >In use</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                   {loading === true && <>
                   <tr>
                    <td colSpan={5} className='text-center'>loading...</td>
                   </tr>
                   
                   </>}
                   {loading === false && <>
                    {data.length !==0 && data.map((dt)=>{
                      return   <tr key={dt._id}>
                      <td>{i++}</td>
                      <td>{dt.item}</td>
                      <td>
                        {dt.qty}
                      </td>
                      <td>
                        {dt.use}
                      </td>
                      <td><span className="badge bg-danger">{calculatePercentage(dt.qty,dt.use)}%</span></td>
                    </tr>
                 })}
                   </>}
                    
                  
                  </tbody>
                </table>
              </div>
        
              <div className="card-footer clearfix">
                <Link to='/inventory' type="button" className="btn btn-primary float-right"> View More</Link>
              </div>
            </div>
    </>
  )
}

export default InventoryOverview
