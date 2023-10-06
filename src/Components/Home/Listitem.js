import React, { useState } from 'react'

const Listitem = (props) => {
    const {data} = props
    const {title,start} = data
    // ${time==='days'?'warning':time==='hours'?'danger':'secondary'}
   
    const calculateDifference = (inputDate) => {
      const inputDateTime = new Date(inputDate);
      const now = new Date();
  
      const diffInMilliseconds = Math.abs(inputDateTime - now);
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const diffInWeeks = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
      const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  
      let difference = '';
  
      if (diffInMonths >= 1) {
        difference = `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'}`;
      } else if (diffInWeeks >= 1) {
        difference = `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'}`;
       
      } else if (diffInDays >= 1) {
        difference = `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
      } else if (diffInHours >= 1) {
        difference = `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`;
      } else {
        difference = `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`;
      }
    return difference
    };
    const calculateDifferenceColor = (inputDate) => {
      const inputDateTime = new Date(inputDate);
      const now = new Date();
  
      const diffInMilliseconds = Math.abs(inputDateTime - now);
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const diffInWeeks = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
      const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  
   
      let clr = ''
      if (diffInMonths >= 1) {
clr ='secondary'
      } else if (diffInWeeks >= 1) {
       clr ='info'
       
      } else if (diffInDays >= 1) {
       clr ='warning'
      } else if (diffInHours >= 1) {
       clr ='danger'
      } else {
        clr = 'primary'
      }

    return clr
    };
  return (
    <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v"></i>
                      <i className="fas fa-ellipsis-v"></i>
                    </span>
               
                    <span className="text">{title}</span>
                    <small className={`badge badge-${calculateDifferenceColor(start)}`}><i className="far fa-clock"></i> {calculateDifference(start)} </small>
                    <div className="tools">
                      <i className="fas fa-edit"></i>
                      <i className="fas fa-trash-o"></i>
                    </div>
                  </li>
  )
}

export default Listitem
