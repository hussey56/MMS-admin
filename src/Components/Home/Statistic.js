import React, { useEffect, useState } from 'react'
import Visitors from './Visitors'
import Upcoming from './Upcoming'
import Expenses from './Expenses'
import InventoryOverview from './InventoryOverview'
import { Link, useNavigate } from 'react-router-dom'


const Statistic = () => {
  const header = useNavigate();
  const currentDate = new Date();
const [loading,setLoading] = useState(true);
const [loading2,setLoading2] = useState(true);
const [loading3,setLoading3] = useState(true);
const [loading4,setLoading4] = useState(true);
  const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); // 'long' for full month name
const [mon,setMon]=useState(1)
const changeMonth = (month)=>{
  if(month==='January'){
    setMon(1)
  }else if(month ==='February'){
    setMon(2)
  }else if(month ==='February'){
    setMon(2)
  }
  else if(month ==='March'){
    setMon(3)
  }else if(month ==='April'){
    setMon(4)
  }else if(month ==='May'){
    setMon(5)
  }else if(month ==='June'){
    setMon(6)
  }else if(month ==='July'){
    setMon(7)
  }else if(month ==='August'){
    setMon(8)
  }else if(month ==='September'){
    setMon(9)
  }else if(month ==='October'){
    setMon(10)
  }else if(month ==='November'){
    setMon(11)
  }
  else if(month ==='December'){
    setMon(12)
  }else{
    setMon(8)
  }
}
const [rev,setRev]  =useState(0)
const FetchDatar = async()=>{
  try {
    const request = await fetch(`http://localhost:5000/app/mms/backend/reservation/getrevenueofthetime/${mon}/${currentYear}`,{
      method:'GET'
    });
    const response = await request.json();
    const {error,msg,totalAmount} = response
   
    if(error===false){
  setRev(totalAmount)
  setLoading(false);
    }else{
      alert(msg)
    } 
  } catch (error) {
    header('/down')

  }

}

  const [data,setData] = useState([])
  const FetchData = async()=>{
    try {
      const admin = localStorage.getItem('admin_token')
    const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getcompletedreservations/admin',{
      method:'GET',
      headers:{
        'admin_token':admin,
      }
    });
    const response = await request.json()

    const {error,reserves,msg} = response
    
    if(error===false){
      setData(reserves)
      setLoading4(false);
    }else{
      alert(msg)
    }
    } catch (error) {
      header('/down')
    }
    
  }
  const[reservationNo,setReservationNo] = useState(0);
  const [CustomerNo,setCustomerNo] = useState(0)
  const FetchReservationNumber = async()=>{
    try {
      const token = localStorage.getItem('admin_token')
      const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getallreservations/admin',{
        method:'GET',
        headers:{
          'admin_token':token,
        }
      });
      const response = await request.json();
      const {total} = response
      
      setReservationNo(total)
      setLoading2(false);  
    } catch (error) {
      header('/');
    }
    
  }
const GetCustomerNo = async()=>{
  try {
    const token = localStorage.getItem('admin_token')
  const request = await fetch('http://localhost:5000/app/mms/backend/customer/customerdataforadmin',{
    method:'GET',
    headers:{
      'admin_token':token,
    }
  });
  const response = await request.json();
  const {no} =response
  setCustomerNo(no)
  setLoading3(false); 
  } catch (error) {
    header('/down')
  }
 

}
const formatNumber =(number)=> {
  if (number < 1000) {
    return number.toString(); // No conversion needed
  } else if (number < 1000000) {
    const thousands = (number / 1000).toFixed(1);
    return thousands.toString() + "K";
  } else {
    const millions = (number / 1000000).toFixed(1);
    return millions.toString() + "M";
  }}
  useEffect(()=>{
    changeMonth(currentMonth)
    FetchDatar()
    FetchReservationNumber()
    GetCustomerNo()
    FetchData()
  },[reservationNo,CustomerNo])
  return (
    <>
       <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
              {loading2 === true && <>
                <h3>loading....</h3>
                </>}
                {loading2 === false && <>
                  <h3>
                  {reservationNo}
                </h3>
                </>}
               

                <p>Total Reservations</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag"></i>
              </div>
              {/* <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                {loading === true && <>
                <h3>loading....</h3>
                </>}
                {loading===false && <>
                  <h3>{formatNumber(rev)}<sup style={{fontSize:'20px'}}>PKR</sup></h3>

                </>}

                <p>{currentMonth} Revenue</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars"></i>
              </div>
              {/* <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
              {loading3 === true && <>
                <h3>loading....</h3>
                </>}
                {loading3 === false && <>
                  <h3>{CustomerNo}</h3>

                </>}

                <p>Customer Registered</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              {/* <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
              {loading4 === true && <>
                <h3>loading....</h3>
                </>}
                {loading4 === false && <>
                  <h3>{data.length}</h3>

                </>}

                <p>Complete Programs</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              {/* <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
        {/* Main row */}
        <div className="row">
          {/* Left col */}
          <section className="col-lg-7 connectedSortable">
          <Expenses/>
            {/* /.card */}

          

            {/* TO DO List */}
         <Upcoming/>
            {/* /.card */}
          </section>
          {/* /.Left col */}
          <section className="col-lg-5 connectedSortable">

            {/* Visitors  card */}
          <Visitors/>
            {/* /.card */}

          

            {/* Inventory Overview */}
         <InventoryOverview/>
            {/* /.card */}
          </section>
          {/* right col */}
        </div>
        {/* /.row (main row) */}
      </div>
    </section>  
    </>
  )
}

export default Statistic
