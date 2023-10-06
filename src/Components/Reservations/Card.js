import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
  const header = useNavigate();
    const {data} = props
    const {_id,reservator_name,event,event_type,price,status,guests,reservator_phone} = data
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
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString(undefined, options);
      return formattedDate;
    };
    const DeleteRequest = async (id)=>{
      try {
        const admin = localStorage.getItem('admin_token')
        const request = await fetch(`http://localhost:5000/app/mms/backend/reservation/deletereservationbyadmin/${id}`,{
    method:'DELETE',
    headers:{
      'admin_token':admin,
    },
  });
  const response = await request.json();
  const {msg,error} = response
  if(error===false){
    alert("Deleted Successfully")
  }else{
    alert(msg);
  }
  
      } catch (error) {
       header('/down'); 
      }
    
    }
    const ChangeStatus = async (status,sid)=>{
      try {
        const token  = localStorage.getItem('admin_token');
        const request = await fetch('http://localhost:5000/app/mms/backend/reservation/updatethestatus/admin',{
          method:'PUT',
          headers:{
            'Content-type':'application/json',
            'admin_token':token,
          },
          body:JSON.stringify({id:sid,status:status})
        });
        const response = await request.json();
        const {msg} = response
        alert(msg);
      } catch (error) {
        header('/down');
      }

    }
    const DateAlter =(dateString)=>{
      const formattedDate = new Date(dateString).toLocaleString("en-US", {
      
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
      
        
      });
      return formattedDate
    }
const [es,setEs] = useState(false)
const [bs,setBs]= useState(false)
const currentDate = moment();
const datetimeToCompare = moment(event.start);
const isDatetimeTodayOrLater = datetimeToCompare.isSameOrAfter(currentDate, 'day');

  return (
    <>
         <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box bg-warning">
              <span className="info-box-icon"><i className="far fa-calendar-alt" style={{fontSize:'40px'}}></i></span>

              <div className="info-box-content ">
                <span className="info-box-text " style={{fontSize:'22px',fontWeight:'600',textDecoration:'underline'}}>{event.title}</span>
                <span className="info-box-number">Person Capacity: <span className='text-light'>{guests}</span></span>
                <span className="info-box-number">Bill Amount: <span className='text-light'>{formatNumber(price)}</span></span>
                <span className="info-box-number">Name: <span className='text-light'>{reservator_name}</span></span>
                <span className="info-box-number">Phone: <span className='text-light'>{reservator_phone}</span></span>
                <span className="info-box-number">Event Type: <span className='text-light'>
                {event_type === 'whole'&&<>Whole Day</>}
                  {event_type === 'more'&&<>1+ Days</>}
                  {event_type === 'specific'&&<>Specific </>}
                  </span></span>

              
                <span className="progress-description">
                  {event_type === 'specific'&&<>
                  <span className='text-dark text-bold'><b>From: </b></span> {DateAlter(event.start)} <br /> <b>to: </b> {DateAlter(event.end)}
                  </>}
                  {event_type === 'whole'&&<><b>Date: </b>{formatDate(event.start)}</>}
                  {event_type === 'more'&&<><b>from: </b>{event.start} <br /> <b>to: </b>  {event.end}</>}
              
                </span>
                <div className="progress">
                  <div className="progress-bar"style={{width:'100%'}}></div>
                </div>
{status ==='waiting' && <>
<button type="button" className="btn btn-block btn-primary btn-sm " onClick={()=>ChangeStatus("approved",_id)} style={{float:'right'}}>Approve</button>

<button type="button" className="btn btn-block btn-dark btn-sm" onClick={()=>ChangeStatus("disapproved",_id)} style={{float:'right'}}>Decline</button>
</>}
{status ==='approved' && <>
{isDatetimeTodayOrLater ? 
<>
<button type="button" className="btn btn-block  btn-success btn-sm" style={{float:'right'}}>Confirmed</button>

</>:<>
<button type="button" className="btn btn-block  btn-success btn-sm" onClick={()=>ChangeStatus("completed",_id)} style={{float:'right'}}>Mark as Completed</button>

</>
  }


<button type="button" className="btn btn-block btn-dark btn-sm" onClick={()=>ChangeStatus("disapproved",_id)} style={{float:'right'}}>Decline</button>



</>}

{status === 'cancelled'&& 
<>
<button type="button" className="btn btn-block btn-danger btn-sm " >Cancelled</button>
<button type="button" className="btn btn-block btn-info btn-sm " onClick={()=>DeleteRequest(_id)} >Remove</button>
</>}
{status === 'completed'&& 
<>
<button type="button" className="btn btn-block  btn-secondary btn-sm" style={{float:'right'}}>Confirmed</button>

<button type="button" className="btn btn-block btn-success btn-sm " >Completed</button>
</>}
{
  status ==='disapproved' &&
  <>
  <button type="button" className="btn btn-block btn-secondary btn-sm " >Declined</button>
  <button type="button" className="btn btn-block btn-light btn-sm " onClick={()=>ChangeStatus("approved",_id)} style={{float:'right'}}>Approve</button>

  </>
}

              </div>
             
            </div>
     
          </div>
    </>
  )
}

export default Card
