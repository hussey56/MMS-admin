import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from '../Utilities/Nav';
import SideNav from '../Utilities/SideNav';
import Footer from '../Utilities/Footer';
import Header from '../Components/Employees/Header';

import Table from '../Components/Employees/Table';
import Preloader from '../Utilities/Preloader';
import Roles from '../Components/Employees/Roles';

const Employee = () => {
  const [loading,setLoading] = useState(true);

    const header = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('admin_token');
      if(!token){
  header('/');
      }
      setTimeout(()=>{
        setLoading(false)
      },500)
  },// eslint-disable-next-line
  [])
  return (
    <>
              <div className="wrapper">
              {loading === true? <>
<Preloader/>
</>:
                <>
               
                <TopNav/>
                <SideNav/>
                <div className="content-wrapper">
                    <div className="content">
<Header/>
<Roles/>
<Table/>
</div>
                </div>
                <Footer/>
                </>}
</div>
    </>
  )
}

export default Employee
