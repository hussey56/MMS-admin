import React, { useEffect, useState } from 'react'
import Listitem from './Listitem'
import {Link, useNavigate} from 'react-router-dom'
const Upcoming = () => {
  const [loading,setLoading] = useState(true);
  const header = useNavigate();
  const [data,setData] = useState([])
  const Results = async()=>{
    try {
      const admin = localStorage.getItem('admin_token')
      const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getsortedapprovedreservations/admin',{
        method:'GET',
        headers:{
          'admin_token':admin
        }
      });
      const response = await request.json()
      const {error,msg,events} = response
      if(error===false){
        setData(events)
        setLoading(false);
      }else{
        alert(msg)
      }
    } catch (error) {
      header('/down');
    }
 
  }
  useEffect(()=>{
  Results()
  },[])
  return (
    <>
       <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="ion ion-clipboard mr-1"></i>
                 Upcoming Events
                </h3>

             
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <ul className="todo-list" data-widget="todo-list">
                  {loading === true &&<>
                  <li className='text-center'>loading...</li>
                  </>}
                  {loading === false && <>
                  
                    {data.length === 0 && <>
                  No Events to come
                  </>}
          {data.length !== 0 && data.map((dt)=>{
            return <Listitem key={dt.start} data={dt}/>
          })}
               
                  </>}
         

                </ul>
              </div>
              {/* /.card-body */}
              <div className="card-footer clearfix">
                <Link to='/events' type="button" className="btn btn-primary float-right"> View More</Link>
              </div>
            </div>
    </>
      
   
  )
}

export default Upcoming
