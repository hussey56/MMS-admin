import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrashCan,faClover, faClock,faAirFreshener,faStore,faTrash,faEdit,faAdd  } from '@fortawesome/free-solid-svg-icons'
const Card = (props) => {
    const {data,update} = props
    const {_id,icon,item,qty,use} = data
    const deletes =async(did)=>{
      props.DeleteInventory(did);
    }
  return (
    <>
      <div className="col-md-3 col-sm-6 col-12">
            <div className="info-box shadow-sm">
              <span className="info-box-icon bg-success"><i className={`${icon}`}></i></span>

              <div className="info-box-content">
                <span className="info-box-text
                "  style={{fontSize:'20px'}}>{item}</span>
                <div style={{width:'100%',border:'1px solid black'}}></div>
                <span className="info-box-number">Quantity: <span className="badge badge-primary right">{qty}</span></span>
                <span className="info-box-number">In Use: <span className="badge badge-info right">{use}</span></span>

              <div className="conatainer  ">
             
                <button className='btn  btn-secondary btn-sm' style={{margin:'2px'}} onClick={update}><span><FontAwesomeIcon icon={faEdit} /></span>Edit</button>
         
               <button className='btn  btn-danger btn-sm' style={{margin:'2px'}} onClick={()=>deletes(_id)}><span><FontAwesomeIcon icon={faTrash} /></span> Delete</button>

            
              </div>
              </div>
            
             
            </div>
           
          </div>
    </>
  )
}

export default Card
