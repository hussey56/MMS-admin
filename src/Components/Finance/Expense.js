import React, { useEffect, useRef, useState } from 'react'
  import Charts from './Charts'
import ExpenseRow from './ExpenseRow'
import { useNavigate } from 'react-router-dom';
const Expense = () => {
  const [loading,setLoading] = useState(true);
  const [loading2,setLoading2] = useState(true);
  const header = useNavigate();
    const [count,setCount] = useState(0)
    const [ex,setEx] = useState(0)
    const [emp,setEmp] = useState(10000)
    const EmployeeSalary = async()=>{
      try {
        const request  = await fetch('http://localhost:5000/app/mms/backend/employees/employeetotalsalary',{
          method:'GET',
        });
        const response = await request.json()
        const {salary} = response
       
        setEmp(salary)
        setLoading2(false)
      } catch (error) {
        header('/down')
      }
    
    }
    const [inputValues, setInputValues] = useState([]);
    const categories = ['Employees', 'Water', 'Electricity','Gas (SUI)','Maintenance','Cleaning goods'];
  
    const handleInputChange = (event, category) => {
      const value = parseFloat(event.target.value); // Parse input as a number
      if (!isNaN(value)) {
        const index = categories.indexOf(category);
  
        if (index !== -1) {
          const updatedValues = [...inputValues];
          updatedValues[index] = value;
          setInputValues(updatedValues);
        }
      }
    };

    const [data,setData] = useState([])
    const FetchExpense = async()=>{
      try {
        const request = await fetch('http://localhost:5000/app/mms/backend/expense/allexpense',{
          method:'GET'
      });
      const response =await request.json()
      const {error,msg , data} = response
      if(error===false){
setData(data)
setLoading(false);
      }else{
alert(msg)
      }
      } catch (error) {
        header('/down')
      }
       
    }
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); // 'long' for full month name

    const [formdata,setFormdata] = useState({year:currentYear,month:currentMonth})
    const onChange = (e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
        console.log(formdata)
    }
    const Cref = useRef()

    const HandelExpense = async(e)=>{
      try {
        e.preventDefault()
        const request = await fetch(`http://localhost:5000/app/mms/backend/expense/createexpense`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({month:formdata.month,year:formdata.year,labels:categories,values:inputValues})
        });
        const response = await request.json()
        const {error,msg} = response
        if(error===false){
            alert('Successfully Registered')
            Cref.current.click()
            setCount(1)
            setFormdata({year:currentYear,month:currentMonth})
            setInputValues([])
        }else{
          Cref.current.click()

            alert(msg)
            setFormdata({year:currentYear,month:currentMonth})
            setInputValues([])
        }
      } catch (error) {
        header('/down')
      }
       
    }
    
    const Dref = useRef()
    const Rref = useRef()
    const [uformdata,setUformdata] = useState({id:'',year:'',month:''})
    const uonChange = (e)=>{
      setUformdata({...uformdata,[e.target.name]:e.target.value})
  }
  const [updateValues, setUpdateValues] = useState([]);
  const handleupdateChange =(event, category) => {
    const value = parseFloat(event.target.value); // Parse input as a number
    if (!isNaN(value)) {
      const index = categories.indexOf(category);

      if (index !== -1) {
        const updatedValues = [...updateValues];
        updatedValues[index] = value;
        setUpdateValues(updatedValues);
      }
    }
  };
  const updateExpense =async (currentExpense)=>{
    Dref.current.click();
   
  setUpdateValues(currentExpense.values)
  setUformdata({id:currentExpense._id,year:currentExpense.year,month:currentExpense.month})
        }
        const EditFunction = async(id,month,year,values)=>{
          try {
            const admin = localStorage.getItem('admin_token')
const request = await fetch(`http://localhost:5000/app/mms/backend/expense/updateexpense/${id}`,{
  method:'PUT',
  headers:{
    'Content-type':'application/json',
    'admin_token':admin,
  },
  body:JSON.stringify({month:month,year:year,values:values,labels:categories})
})
const resposne = await request.json()
const {error,msg} = resposne
if(error===false){
  alert('Updated SuccessFully')
  setEx(9)
  setCount(90)
}else{
  alert(msg)
}
          } catch (error) {
            header('/down')
          }

        }
    const HandleUpdate = async (e)=>{
e.preventDefault()
EditFunction(uformdata.id,uformdata.month,uformdata.year,updateValues)
Rref.current.click()
    }
    useEffect(()=>{
        FetchExpense()
        EmployeeSalary()
    },[data,emp,ex])
  return (
    <>
    <button className='btn btn-primary d-none' ref={Dref} data-toggle="modal" data-target="#modal-default-expense-update">update Expense</button>
  <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <div className="card card-secondary">
              <div className="card-header ">
                <h3 className="card-title">Expense History - <button className='btn btn-primary' data-toggle="modal" data-target="#modal-default-expense">Add New Expense</button></h3>
              </div>
              <div className="card-body p-0">
                <table className="table table-striped">
                  <thead>
                    <tr>
                     
                      <th>Employees</th>
                      <th>Water</th>
                      <th>Electricity</th>
                      <th>Gas</th>
                      <th>Maintenence</th>
                      <th>Cleaning Goods</th>
                      <th>Month</th>
                      <th>Year</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading === true && <tr>
                      <td colSpan={9} className='text-center'>Loading...</td></tr>}
                      {loading === false && <>
                        {data.length !==0 &&data.map((dt)=>{
                  return <ExpenseRow data={dt} key={dt._id} update={()=>updateExpense(dt)}/>
                })}
                      </>}
              
                  </tbody>
                </table>
              </div>
              </div>
              </div>
              </div>
              </div>
              <div className="modal fade" id="modal-default-expense">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Expense</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandelExpense}>
            <div className="modal-body">
      
                    <div className="form-group">
                    <label htmlFor="month">Month</label>
                    <input type="text" name="month" disabled  value={formdata.month} onChange={onChange} className="form-control" id="month"  required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">year</label>
                    <input type="text" name="year" disabled value={formdata.year} onChange={onChange} className="form-control" id="year"  required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Total Employee Salary</label>
                    {loading2 === false &&
                                        <input type="number" name="salary" disabled value={emp} onChange={onChange} className="form-control" id="year"  required/>

                    }
                  </div>
            {categories.map((category, index) => (
        <div key={index} className="form-group">
          <label name={index}></label>
            {category.charAt(0).toUpperCase() + category.slice(1)}:
            <input
            className='form-control'
              type="number"
              name={index}
              value={inputValues[index] || ''}
              
              onChange={(event) => handleInputChange(event, category)}
              required
            />
          
        </div>
      ))}

           
            </div>

            <div className="modal-footer justify-content-between">
              <button   className="btn btn-default" ref={Cref} data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Register</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modal-default-expense-update">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Expense</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={HandleUpdate}>
            <div className="modal-body">
      
                    <div className="form-group">
                    <label htmlFor="month">Month</label>
                    <input type="text" name="month" disabled value={uformdata.month} onChange={uonChange} className="form-control" id="month"  required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">year</label>
                    <input type="text" name="year" disabled value={uformdata.year} onChange={uonChange} className="form-control" id="year"  required/>
                  </div>
            {categories.map((category, index) => (
        <div key={index} className="form-group">
          <label name={index}></label>
            {category.charAt(0).toUpperCase() + category.slice(1)}:
            <input
            className='form-control'
              type="number"
              name={index}
              value={updateValues[index] || ''}
              
              onChange={(event) => handleupdateChange(event, category)}
              required
            />
          
        </div>
      ))}

           
            </div>

            <div className="modal-footer justify-content-between">
              <button   className="btn btn-default" ref={Rref} data-dismiss="modal">Close</button>
              <button  className="btn btn-primary" type='submit'>Update</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    <Charts data={count}/>



    </>
  )
}

export default Expense
