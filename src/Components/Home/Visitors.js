import React , {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Trow from './Trow'

const Visitors = () => {
const [loading,setLoading] = useState(true);
const [data,setData] = useState([])
const header = useNavigate();
const FetchData = async()=>{
  try {
    const admin = localStorage.getItem('admin_token')
    const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getfivereservations/admin',{
      method:'GET',
      headers:{
        'admin_token':admin,
      }
    });
    const response = await request.json()
    const {error,reserves,msg} = response
    if(error===false){
      setData(reserves)
      setLoading(false)
    }else{
      alert(msg)
    }
  } catch (error) {
    header('/down')
  }

}
useEffect(()=>{
  FetchData()
},[])
  return (
    <>
       <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">Latest Resevations</h3>

               
              </div>
              <div className="card-body">
              <table className="table table-bordered ">
                  <thead className='bg-secondary'>
                    <tr>
                      <th >Customer</th>
                      <th>Gusets</th>
                      <th>Event Type</th>
                      <th>Event Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {loading === true &&
                    <>
                    <tr>
                      <td colSpan={4} className='text-center'>Loading...</td>
                    </tr>
                    </>}
                    {loading === false && <>
                      {data.length !== 0 && data.map((dt)=>{
                  return <Trow data={dt} key={dt._id}/>
                 })}
                    </>}
                
                  </tbody>
                  </table>
              </div>
              <div className="card-footer clearfix">
                <Link to='/requests' type="button" className="btn btn-info float-right"> View All</Link>
              </div>
             {/*} <!-- /.card-body -->*/}
            </div> 
    </>
  )
}

export default Visitors
