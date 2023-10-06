import React, { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrashCan,faClover, faClock,faAirFreshener,faStore,faTrash,faEdit,faAdd  } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
const Content = () => {
  const header = useNavigate();
  const [loading,setLoading] = useState(true);
  const Cref  =useRef();
  const Uref = useRef()
  const Dref = useRef()
  const [data,setData] = useState([]);
  const [formdata,setFormdata] = useState({item:"",icon:"",qty:0,use:0});
  const [uformdata,setUformdata] = useState({id:"",item:"",icon:"",qty:0,use:0});
  const onChange = (e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  const UonChange = (e)=>{
    setUformdata({...uformdata,[e.target.name]:e.target.value})
  }
  const HandleAdd = async()=>{
    try {
      const admin  =localStorage.getItem('admin_token')
    const request = await fetch('http://localhost:5000/app/mms/backend/inventory/addainventory',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'admin_token':admin,
      },
      body:JSON.stringify({item:formdata.item,icon:formdata.icon,qty:formdata.qty,use:formdata.use})
    });
    const resposne = await request.json()
    const {msg,error} = resposne
  if(error===false){
    alert('Item Added Successfully')
    setFormdata({item:"",icon:"",qty:0,use:0})
    Cref.current.click()
  }else{
    alert(msg)
    Cref.current.click()
    setFormdata({item:"",icon:"",qty:0,use:0})
  }
    } catch (error) {
      header('/down')
    }
    
  }
  const  GetData = async()=>{
    try {
      const admin = localStorage.getItem('admin_token');
      const request = await fetch('http://localhost:5000/app/mms/backend/inventory/getallinventory',{
        method:'GET',
        headers:{
          'admin_token':admin,
        }
      });
      const response = await request.json()
      const {all,len} = response
      setData(all)
      setLoading(false)
    } catch (error) {
      header('/down')
    }
 
  }
  const DeleteInventory = async(id)=>{
    try {
      const result = window.confirm("Do You really want to delete the inventory item?")
    if(result){
      const admin = localStorage.getItem('admin_token')
      const request = await fetch(`http://localhost:5000/app/mms/backend/inventory/deleteinventory/${id}`,
      {
        method:'DELETE',
        headers:{
          'admin_token':admin,
        },
      });
      const response = await request.json()
      const {error,msg} = await response
      if(error===false){
        const newlist = data.filter((note)=>{
          return note._id!==id
        })
        setData(newlist)
        alert('Item Deleted Successfully')
      }else{
        alert(msg)
      }
    }
    } catch (error) {
      header('/down')
    }
 
  }
  const EditFunction = async(id,item,icon,qty,use)=>{
    try {
      const admin = localStorage.getItem('admin_token');
const request = await fetch( `http://localhost:5000/app/mms/backend/inventory/updateinventory/${id}`,{
  method:'PUT',
  headers:{
    'Content-type':'application/json',
    'admin_token':admin,
  },
  body:JSON.stringify({item:item,icon:icon,qty:qty,use})
});
const response = await request.json()
const {error,msg} = response
if(error===false){
  console.log('Updated Successfully')
}
else{
alert(msg)
}
    } catch (error) {
      header('/down')
    }

  }
  const EditButton = async(cuurentInventory)=>{
Uref.current.click();
setUformdata({id:cuurentInventory._id,item:cuurentInventory.item,icon:cuurentInventory.icon,qty:cuurentInventory.qty,use:cuurentInventory.use})
  }
  const HandleUpdate = async(e)=>{
e.preventDefault();
EditFunction(uformdata.id,uformdata.item,uformdata.icon,uformdata.qty,uformdata.use);
Dref.current.click()
  }
  useEffect(()=>{
    GetData()
  },[data])
  return (
    <>
      <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-10">
            <h1 className="m-0">Inventory</h1>
          </div>
          <div className="col-sm-2">
          <button type="button" className="btn btn-block btn-warning btn-sm" data-toggle="modal" data-target="#modal-inventory"><span><FontAwesomeIcon icon={faAdd} /> </span> Add New Inventory Item</button>
          <button type="button" className="btn btn-block btn-warning btn-sm d-none" ref={Uref} data-toggle="modal" data-target="#modal-inventory-update"><span><FontAwesomeIcon icon={faAdd} /> </span> Add New Inventory Item</button>

          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="modal-inventory">
        <div className="modal-dialog">
          <form onSubmit={HandleAdd}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Inventory Item</h4>
              <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="form-group">
                    <label htmlFor="Item">Item Name</label>
                    <input type="text" name="item" value={formdata.item} onChange={onChange} required className="form-control" id="item" placeholder="Enter Item Name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Quantity">Item Quantity</label>
                    <input type="number" min={1} name="qty" value={formdata.qty} onChange={onChange} required  className="form-control" id="qty" placeholder="Enter Item Quantity"/>
                  </div> 
                  <div className="form-group">
                    <label htmlFor="Use">Item In Use (Qty)</label>
                    <input type="number" min={1} name="use" value={formdata.use} onChange={onChange} required className="form-control" id="use" placeholder="Enter Item Usage"/>
                  </div> 
                  <div className="form-group">
                    <label htmlFor="Icon">Item Icon</label>
                    <input type="text" name="icon" value={formdata.icon} onChange={onChange} required className="form-control" id="icon" placeholder="Enter Item Icon"/>
                  <span>Get Icons From <a href="https://fontawesome.com/search?q=hotel&o=r&m=free" target='blank'>Here</a></span>
                  </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" ref={Cref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" disabled={formdata.use>formdata.qty} className="btn btn-primary">Add</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    {/* end header */}
    {/* update model */}
    <div className="modal fade" id="modal-inventory-update">
        <div className="modal-dialog">
          <form onSubmit={HandleUpdate}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Inventory Item</h4>
              <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="form-group">
                    <label htmlFor="Item">Item Name</label>
                    <input type="text" name="item" value={uformdata.item} onChange={UonChange} required className="form-control" id="item" placeholder="Enter Item Name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Quantity">Item Quantity</label>
                    <input type="number" min={1} name="qty" value={uformdata.qty} onChange={UonChange} required  className="form-control" id="qty" placeholder="Enter Item Quantity"/>
                  </div> 
                  <div className="form-group">
                    <label htmlFor="Use">Item In Use (Qty)</label>
                    <input type="number" min={1} name="use" value={uformdata.use} onChange={UonChange} required className="form-control" id="use" placeholder="Enter Item Usage"/>
                  </div> 
                  <div className="form-group">
                    <label htmlFor="Icon">Item Icon</label>
                    <input type="text" name="icon" value={uformdata.icon} onChange={UonChange} required className="form-control" id="icon" placeholder="Enter Item Icon"/>
                  <span>Get Icons From <a href="https://fontawesome.com/search?q=hotel&o=r&m=free" target='blank'>Here</a></span>
                  </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" ref={Dref} className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" disabled={uformdata.use>uformdata.qty} className="btn btn-primary">Update</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    {/* update model end*/}
 
    <div className='content'>
      <div className="fluid-container">
        <div className="row">
          {loading === false && <>
            {data.length !== 0 &&<>
          {data.map((dt)=>{
            return <Card key={dt._id} data={dt}
            DeleteInventory={DeleteInventory} update={()=>EditButton(dt)}/>
          })}
          </>}
          </>}
          {loading===true && <>
          <div className="text-center">
            <h2>Loading...</h2>
          </div>
          </>}
      
   
       
        
        
        

        
       
        </div>
      </div>
    </div>
    </>
  )
}

export default Content
