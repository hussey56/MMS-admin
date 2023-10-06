import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faDollarSign,faExchange , faFlag } from '@fortawesome/free-solid-svg-icons'
const Stat = () => {

  const header = useNavigate();
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
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); // 'long' for full month name
const [mon,setMon]=useState(8)
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
const FetchData = async(req,res)=>{
  try {
    const request = await fetch(`http://localhost:5000/app/mms/backend/reservation/getrevenueofthetime/${mon}/${currentYear}`,{
      method:'GET'
    });
    const response = await request.json();
    const {error,msg,totalAmount} = response
    if(error===false){
  setRev(totalAmount)

    }else{
      alert(msg)
    }
  } catch (error) {
    header('/down')
  }

}
const [sumd,setSumd] = useState(0)
const [sumErr,setSumErr] = useState(false)
const FetchExpnse = async(month,year)=>{
  try {
    const request = await fetch(`http://localhost:5000/app/mms/backend/expense/monthexpense/${month}/${year}`,{
      method:'GET',
  
    });
    const response  = await request.json()
    const {error,er,msg,sum} = response
    if(error===false){
      setSumd(sum)
    }else if(error===true && er===1){
  setSumErr(true)
    }else if(error===true && er===2){
      setSumErr(true)
        }else{
          alert(msg)
        }
  } catch (error) {
    header('/down')
  }
 
}
useEffect(()=>{
  FetchData()
  FetchExpnse(currentMonth,currentYear)
changeMonth(currentMonth)
},[])
  return (
    <>
     <div className="container-fluid">
     <div className="row">
          <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box shadow-none">
              <span className="info-box-icon bg-primary"><FontAwesomeIcon icon={faExchange}/></span>

              <div className="info-box-content">
                <span className="info-box-text">This Month Revenue</span>
                <span className="info-box-number">{formatNumber(rev)} PKR</span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
          {/* /.col */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box shadow-sm">
              <span className="info-box-icon bg-info"><FontAwesomeIcon icon={faFlag}/></span>

              <div className="info-box-content">
                <span className="info-box-text">This Month Taxes</span>
                <span className="info-box-number">{formatNumber((rev/100)*3)} PKR</span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
          {/* /.col */}
            {/* /.col */}
            <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box shadow-lg">
              <span className="info-box-icon bg-danger"><i className="far fa-star"></i></span>

              <div className="info-box-content">
                <span className="info-box-text">This Month Expense</span>
                {sumErr === false && <>
                  <span className="info-box-number">PKR {formatNumber(sumd)}</span>

                </>}
                {sumErr === true && <>
                  <span className="info-box-number">Expense Not Enter</span>

                </>}
              </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
          {/* /.col */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box shadow">
              <span className="info-box-icon bg-success"><FontAwesomeIcon icon={faDollarSign}/></span>

              <div className="info-box-content">
                <span className="info-box-text">This Month Profit</span>
                <span className="info-box-number">PKR {formatNumber(rev-((rev/100)*3)-sumd)}</span>
              </div>
              {/* /.info-box-content */}
            </div>
            {/* /.info-box */}
          </div>
        
        </div>
        </div> 
    </>
  )
}

export default Stat
