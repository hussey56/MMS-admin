import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCashRegister } from '@fortawesome/free-solid-svg-icons'

const SideNav = () => {
  const location = useLocation();
 const [loading,setLoading] = useState(true);
  const [data,setData] = useState(null)
  const [st,setSt] = useState(0)
  const header = useNavigate()

  const getData = async()=>{
    try {
      const token =  localStorage.getItem('admin_token');
      const request = await fetch('http://localhost:5000/app/mms/backend/admin/admindata',{
          method:'GET',
          headers:{
              'admin_token':token,
          }
      });
      const response = await request.json();
      const {admin} = response
      const {name,role} = admin
      setData(name)
      setSt(role)
      setLoading(false);
    } catch (error) {
      header('/down')
    }
      
  }
  useEffect(()=>{
    getData()
  },// eslint-disable-next-line
  [])
  const token = localStorage.getItem('admin_token')
  useEffect(()=>{
    if(!token){
      header('/')
    }
  },[token])
  // const {data,getData} = context

  return (
    <>
     <aside className="main-sidebar sidebar-dark-light elevation-4">
    {/* Brand Logo */}
    <Link to="/home" className="brand-link">
      <img src="main/img/s.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity:'.8'}}/>
      <span className="brand-text font-weight-light">KRS Wedding Palace</span>
    </Link>

    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" className="img-circle elevation-2" alt="User"/>
        </div>
        <div className="info">
          {loading === true && <>
            <Link to="/account" className="d-block">loading...</Link>

          </>}
          {loading === false && <>
            <Link to="/account" className="d-block">{data}</Link>

          </>}
        </div>
      </div>

    

      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
          <li className="nav-item ">
            <Link to="/home" className={`nav-link ${location.pathname==='/home'?'active':''}`}>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </Link>
          
          </li>
      
          <li className="nav-item">
            <Link to="/requests"className={`nav-link ${location.pathname==='/requests'?'active':''}`}>
              <i className="nav-icon far fa-envelope"></i>
              <p>
                Reservations
              </p>
            </Link>      
          </li>
  
          <li className="nav-item">
            <Link to="/events" className={`nav-link ${location.pathname==='/events'?'active':''}`}>
              <i className="nav-icon far fa-calendar-alt"></i>
              <p>
                Events              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory" className={`nav-link ${location.pathname==='/inventory'?'active':''}`}>
              <i className="nav-icon fas fa-th"></i>
              <p>
               Inventory
              </p>
            </Link>
          </li>
          {st === 1 && <>
            <li className="nav-item">
            <Link to="/signup"className={`nav-link ${location.pathname==='/signup'?'active':''}`}>
           <span className="nav-icon">  <FontAwesomeIcon icon={faCashRegister}/></span> 
              <p>
             Sign up
                
              </p>
            </Link>      
          </li>
          </>}
       
          <li className="nav-item">
            <Link to="/employees" className={`nav-link ${location.pathname==='/employees'?'active':''}`}>
              <i className="nav-icon fas fa-edit"></i>
              <p>
                Employee Management       
              </p>
            </Link>        
          </li>
          <li className="nav-item">
            <Link to="/finance" className={`nav-link ${location.pathname==='/finance'?'active':''}`}>
              <i className="nav-icon fas fa-chart-pie"></i>
              <p>
                Finance
              </p>
            </Link>
          </li>
    
       
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside> 
    </>
  )
}

export default SideNav
