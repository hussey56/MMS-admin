import React from 'react'
import {Link} from 'react-router-dom'
const TopNav = () => {
  
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <span className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars"></i></span>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/home" className="nav-link">Home</Link>
      </li>
     
    </ul>

    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
  

  

    </ul>
  </nav>
    </>
  )
}

export default TopNav
