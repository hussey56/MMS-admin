import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faMale, faFemale, faL } from '@fortawesome/free-solid-svg-icons'
const Stats = (props) => {
  const [loading1,setLoading1] = useState(true)
  const [loading2,setLoading2] = useState(true)
  const [loading3,setLoading3] = useState(true)
  const [loading4,setLoading4] = useState(true)
  const header = useNavigate();
  const [male,setMale]= useState(0)
  const [female,setFemale] = useState(0)
  const [total,setTotal] = useState(0)
  const [avg,setAvg] = useState(20);
  const LoadMale = async()=>{
    try {
      const request  = await fetch('http://localhost:5000/app/mms/backend/employees/employeebygender/male',{
        method:'GET',
      });
      const response = await request.json()
      const {len} = response
      setMale(len)
      setLoading1(false)
    } catch (error) {
      header('/down')
    }
   
  }
  const LoadFeMale = async()=>{
    try {
      const request  = await fetch('http://localhost:5000/app/mms/backend/employees/employeebygender/female',{
        method:'GET',
      });
      const response = await request.json()
      const {len} = response
      setFemale(len)
      setLoading2(false);
    } catch (error) {
      header('/down')
    }
  
  }
  const LoadTotal = async()=>{
    try {
      const admin = localStorage.getItem('admin_token')
      const request  = await fetch('http://localhost:5000/app/mms/backend/employees/employeelist/admin',{
        method:'GET',
        headers:{
          'admin_token':admin,
        }
      });
      const response = await request.json()
      const {len} = response
      setTotal(len)
      setLoading3(false)
    } catch (error) {
      header('/down')
    }
 
  }
  const LoadAverage = async()=>{
    try {
      const request  = await fetch('http://localhost:5000/app/mms/backend/employees/employeeaveragesalary',{
        method:'GET',
      });
      const response = await request.json()
      const {result} = response
      if(result.length !==0){
        const data1 = result[0].averageSalary 
        setAvg(data1)
        setLoading4(false)
      }
    } catch (error) {
      header('/down')
    }
   
   
  }
  useEffect(()=>{
    LoadMale()
    LoadFeMale()
    LoadTotal()
    LoadAverage()
  },[total,props.data])
  return (
    <div className='container-fluid'>
        <div className="row">
        <div className="col-lg-3 col-6">
            <div className="small-box bg-warning">
              <div className="inner">
                {loading3 === true && <h3>Loading...</h3>}
                {loading3 === false &&
                <h3>{total}</h3>}

                <p>Employee Registered</p>
              </div>
              <div className="icon">
                <i className="fas fa-user-plus"></i>
              </div>
           
            </div>
          </div>
   
        
      
          <div className="col-lg-3 col-6">
          
          <div className="small-box bg-info">
            <div className="inner">
              {loading1 === true && <h3>Loading...</h3>}
              {loading1 === false &&
              <h3>{male}</h3>}

              <p>Male Employees</p>
            </div>
            <div className="icon">
           <FontAwesomeIcon icon={faMale}/>         </div>
           
          </div>
        </div>
        <div className="col-lg-3 col-6">
          
          <div className="small-box bg-danger">
            <div className="inner">
              {loading2 === true && <h3>Loading...</h3>}
              {loading2 === false &&
              <h3>{female}</h3>}

              <p>Female Employees</p>
            </div>
            <div className="icon">
           <FontAwesomeIcon icon={faFemale}/>         </div>
          
          </div>
        </div>
        <div className="col-lg-3 col-6">
           
           <div className="small-box bg-success">
             <div className="inner">
              {loading4 === true && <h3>Loading...</h3>}
              {loading4 === false && <> 
               <h3>{Math.round(avg)}<sup style={{fontSize:'20px'}}>Pkr</sup></h3>
              </>}

               <p>Average Salary</p>
             </div>
             <div className="icon">
               <i className="ion ion-stats-bars"></i>
             </div>
            
           </div>
         </div>
          </div>
  
    </div>
  )
}

export default Stats
