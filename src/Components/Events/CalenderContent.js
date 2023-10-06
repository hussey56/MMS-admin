import React , {useRef,useEffect, useState} from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calender.css'
import { useNavigate } from 'react-router-dom';
const CalenderContent = (props) => {
 const header = useNavigate();
  const calendarEl = useRef(null);
  var checkbox = document.getElementById('drop-remove');
  const [eventData,setEventData] = useState([])
  const FetchEvents = async()=>{
    try {
      const admin = localStorage.getItem('admin_token');
      const request = await fetch('http://localhost:5000/app/mms/backend/reservation/getapprovedreservations/admin',{
        method:'GET',
        headers:{
          'admin_token':admin,
        }
      });
      const response = await request.json();
      const {error,msg,events} = response
      if(error===false){
        setEventData(events)
      }
    } catch (error) {
      header('/down')
    }
   
  }
 const CalenderRender =  ()=>{
 
  const calendar =  new Calendar(calendarEl.current, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    themeSystem: 'bootstrap',
    //Random default events
    events:  eventData,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar !!!
    drop: function (info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
  });


 calendar.render();
 }
const [events,setEvents] = useState([])
const [loading2,setLoading2] = useState(true);

 const LoadEvents = async()=>{
  try {
    const admin = localStorage.getItem('admin_token')
    const request = await fetch('http://localhost:5000/app/mms/backend/event/allevent',{
      method:'GET',
      headers:{
        'admin_token':admin
      }
    });
    const response = await request.json();
    
    const {msg,error,all} = response
    if(error===false){
    setEvents(all)
    setLoading2(false);
    }else{
      alert(msg)
    }
  } catch (error) {
    header('/down')
  }


}
 useEffect(() => {
  FetchEvents(); // Fetch the data initially
 
},[]);
useEffect(()=>{
  LoadEvents()
},[props.data])

useEffect(() => {
  CalenderRender(); // Render the calendar whenever eventData changes
}, [eventData]);

  return (
    <>
       <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="sticky-top mb-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Events</h4>
                </div>
                <div className="card-body">
                  {/* the events */}
                  <div id="external-events">
                    {loading2 === true && <>
                      <div className="external-event" style={{backgroundColor:'white',color:'black'}}>loading...</div>
                    </>}
                    {loading2 === false && <>
                      {events.length !== 0 && events.map((evt)=>{
                      return  <div className="external-event" key={evt._id} style={{backgroundColor:evt.color,color:'white'}}>{evt.name}</div>
                    })}
                    </>}
                   
                   
                   
              
                  </div>
                </div>
                {/* /.card-body */}
              </div>
          
            </div>
          </div>
          {/* /.col */}
          <div className="col-md-9">
            <div className="card card-primary">
              <div className="card-body p-0">
                {/* THE CALENDAR */}
               
                  <div id="calendar"  ref={calendarEl}></div>

              
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </section> 
    </>
  )
}

export default CalenderContent
