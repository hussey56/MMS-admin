import React, { useEffect, useRef, useState } from 'react'
import Trow from './Trow'
import Header from './Header'
import CalenderContent from './CalenderContent';
import { useNavigate } from 'react-router-dom';

const ManageEvent = () => {
  const header = useNavigate();
  const [loading,setLoading] = useState(true)
    const Cref = useRef();
    const [data,setData] = useState([])
    const fetchData = async()=>{
      try {
        const admin = localStorage.getItem('admin_token')
        const request = await fetch('http://localhost:5000/app/mms/backend/event/allevent',{
            method:'GET',
            headers:{
                'admin_token': admin,
            }
        });
    
 const response = await request.json();
const {error,msg,all} = response
if(error === false){
    setData(all)
    setLoading(false);
}else{
    alert(msg)
} 
      } catch (error) {
        header('/down')
      }
        
    }
    const [formdata,setFormData] =useState({name:"",price100:20000,price200:30000,price400:40000,price600:90000,color:"rgb(255,255,255)",perday:4000,perhour:30000})
    const onChange =(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }
    const HandleForm = async (e)=>{
      try {
        e.preventDefault();
 
        const admin = localStorage.getItem('admin_token');
        const request = await fetch('http://localhost:5000/app/mms/backend/event/makeaevent',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'admin_token':admin
            },
            body:JSON.stringify({name:formdata.name,price100:formdata.price100,price200:formdata.price200,price400:formdata.price400,price600:formdata.price600,color:formdata.color,perhour:formdata.perhour,perday:formdata.perday})
        })
        const response  = await request.json();
   
      const {error,msg} = response

      if(error===false){
          alert('Registered Successfully')
          setFormData({name:"",price100:20000,price200:30000,price400:40000,price600:90000,perday:4000,perhour:30000,color:"rgb(255,255,255)"})

          Cref.current.click()
      }else{
          alert(msg)
          setFormData({name:"",price100:20000,price200:30000,price400:40000,price600:90000,perday:4000,perhour:30000,color:'rgb(255,255,255)'})

          Cref.current.click()
      }
      } catch (error) {
        header('/down')
      }
     
    }
    const deletion = async (id)=>{
      try {
        const result = window.confirm("Do you Really want to delete this event?")
        if(result){
            const admin = localStorage.getItem('admin_token');
            const request = await fetch(`http://localhost:5000/app/mms/backend/event/deleteevent/${id}`,{
                method:'DELETE',
                headers:{
                    'admin_token':admin
                }
            });
            const response = await request.json();
            const {error,msg} = response
            if(error===false){
                alert("Deleted Successfully")
            }
            else{
                alert(msg)
            }
        }   
      } catch (error) {
        header('/down')
      }
        
       

    }
    const [uformData,setuformdata] = useState({id:"",name:"",price100:20000,price200:30000,price400:40000,price600:90000,color:"",perhour:9000,perday:45000})
    const uOnChange = (e)=>{
        setuformdata({...uformData,[e.target.name]:e.target.value})
    }
    const UCref = useRef();
    const Oref = useRef();
    const EditButton = async(cuurentEvent)=>{
        Oref.current.click();
        setuformdata({id:cuurentEvent._id,name:cuurentEvent.name,price100:cuurentEvent.price100,price200:cuurentEvent.price200,price400:cuurentEvent.price400,price600:cuurentEvent.price600,color:cuurentEvent.color,perday:cuurentEvent.perday,perhour:cuurentEvent.perhour})
          }
    const EditFunction = async(id,name,price100,price200,price400,price600,color,perhour,perday)=>{
      try {
        const admin = localStorage.getItem('admin_token');
const request = await fetch(`http://localhost:5000/app/mms/backend/event/updateevent/${id}`,{
    method:'PUT',
    headers:{
        'Content-type':'application/json',
        'admin_token':admin
    },
    body:JSON.stringify({name:name,price100:price100,price200:price200,price400:price400,price600:price600,color:color,last_updated:Date.now(),perday:perday,perhour:perhour})
});
const response = await request.json();
const {msg,error} = response
if(error===false){
    alert("Updated Successfully")
    setuformdata({id:"",name:"",price100:20000,price200:30000,price400:40000,price600:90000,color:"",perday:9000,perhour:8000})
}else{
    setuformdata({id:"",name:"",price100:20000,price200:30000,price400:40000,price600:90000,color:"",perday:9000,perhour:45000})

    alert("error"+msg)
}
      } catch (error) {
       header('/down') 
      }

    }
    const HandleUpdate = async(e)=>{
e.preventDefault();
EditFunction(uformData.id,uformData.name,uformData.price100,uformData.price200,uformData.price400,uformData.price600,uformData.color,uformData.perhour,uformData.perday);
UCref.current.click();
    }
useEffect(()=>{
        fetchData();
    },[data])
  return (
  <>
  {/* add model starts */}
  <div className="modal fade" id="modal-event">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Event</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandleForm}>
            <div className="modal-body">
             

            
            <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input type="text" name="name" value={formdata.name} onChange={onChange} className="form-control" id="name" placeholder="Enter Enplyee Name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (100-200)</label>
                    <input type="number" value={formdata.price100} onChange={onChange}  name="price100" className="form-control" id="price100" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (200-400)</label>
                    <input type="number" value={formdata.price200} onChange={onChange}  name="price200" className="form-control" id="price200" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (400-600)</label>
                    <input type="number" value={formdata.price400} onChange={onChange}  name="price400" className="form-control" id="price400" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (600+)</label>
                    <input type="number" value={formdata.price600} onChange={onChange}  name="price600" className="form-control" id="price1600" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Per hour</label>
                    <input type="number" value={formdata.perhour} onChange={onChange}  name="perhour" className="form-control" id="price1600" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Per Day</label>
                    <input type="number" value={formdata.perday} onChange={onChange}  name="perday" className="form-control" id="price1600" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Color</label>
                    <input type="color" value={formdata.color} onChange={onChange}  name="color" className="form-control" id="price1600" required/>

                  </div>
                  <div className="form-group">
                    {formdata.price100 >= formdata.price200 &&
                       <p className='text-danger'>Price for 100 person must be less than price of 200 person</p>

                     }
                       {formdata.price200 >= formdata.price400 &&
                       <p className='text-danger'>Price for 200 person must be less than price of 400 person</p>

                     }
                          {formdata.price400 >= formdata.price600 &&
                       <p className='text-danger'>Price for 400 person must be less than price of 600 person</p>

                     }
                
                  </div>
                  
            </div>

            <div className="modal-footer justify-content-between">
              <button type="button" ref={Cref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" disabled={formdata.price100 >= formdata.price200||formdata.price200 >= formdata.price400 || formdata.price400 >= formdata.price600} type='submit'>Register</button>
            </div>
            </form>
          </div>
        </div>
      </div>
  {/* add model ends */}
   {/* update model */}
   <button className='btn btn-success d-none' type='button' ref={Oref} data-toggle="modal" data-target="#modal-event-update">Update</button>
   <div className="modal fade" id="modal-event-update">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Event</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandleUpdate}>
            <div className="modal-body">
             

            
            <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input type="text" name="name" value={uformData.name} onChange={uOnChange} className="form-control" id="name" placeholder="Enter Enplyee Name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (100-200)</label>
                    <input type="number" value={uformData.price100} onChange={uOnChange}  name="price100" className="form-control" id="price100" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (200-400)</label>
                    <input type="number" value={uformData.price200} onChange={uOnChange}  name="price200" className="form-control" id="price200" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (400-600)</label>
                    <input type="number" value={uformData.price400} onChange={uOnChange}  name="price400" className="form-control" id="price400" required/>

                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price (600+)</label>
                    <input type="number" value={uformData.price600} onChange={uOnChange}  name="price600" className="form-control" id="price1600" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Per Hour</label>
                    <input type="number" value={uformData.perhour} onChange={uOnChange}  name="perhour" className="form-control" id="perhour" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Per Day</label>
                    <input type="number" value={uformData.perday} onChange={uOnChange}  name="perday" className="form-control" id="perhour" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Color</label>
                    <input type="color" value={uformData.color} onChange={uOnChange}  name="color" className="form-control" id="price1600" required/>

                  </div>
            </div>

            <div className="modal-footer justify-content-between">
              <button type="button" ref={UCref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Update</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    {/* update model end*/}
     <div className="container-fluid m-3">
      <div className="row">
        <div className="col-12">
        <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Events - <button className='btn btn-success' type='button' data-toggle="modal" data-target="#modal-event">Add New Event</button></h3>
              </div>
       
              <div className="card-body p-0">
                <table className="table table-striped">
                  <thead>
                    <tr>
                 
                      <th>Event Name</th>
                      <th>Price(100-200)</th>
                      <th>Price(200-400)</th>
                      <th>Price(400-600)</th>       
                      <th>Price(600+)</th>       
                      <th>Per Day</th>       
                      <th>Per Hour</th>       
          <th>Color</th>      
                      <th>Last Updated</th>
                      <th>Action</th>
                 
                    </tr>
                  </thead>
                  <tbody>
                    {loading === true && <>
                    <tr>
                      <td colSpan={10} className='text-center'>loading...</td>
                    </tr>
                    </>}
                    {loading === false && <>
                    
                   
                {data.length !== 0  && data.map((dt)=>{
                  return <Trow key={dt._id} data={dt} deletion={deletion} update={()=>EditButton(dt)}/>
                })}
                 </>}
                  </tbody>
                </table>
              </div>
             
            </div>
            </div>
            </div>  
        
        </div> 
        <Header/>
        <CalenderContent data={data}/>
    </>
 
  )
}

export default ManageEvent
