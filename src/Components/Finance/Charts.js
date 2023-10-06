import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Chart from 'chart.js/auto';
import Profit from './Profit';
const Charts = (props) => {
  const header = useNavigate();
  const initialChartData = {
    labels: ['Employees', 'Water', 'Electricity', 'Gas (SUI)', 'Maintenance', 'Cleaning goods'],
    data: [30, 18, 20, 22, 8, 2],
    backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
  };
  const [chartData, setChartData] = useState(initialChartData);
  const chartRef = useRef(null);

  const FetchChart = async () => {
    try {
      const response = await fetch('http://localhost:5000/app/mms/backend/expense/lastexpense', {
        method: 'GET',
      });
      const { error, data, msg } = await response.json();
      if (error === false) {
        const { labels, percentage, background } = data;
        setChartData({
          labels: labels || initialChartData.labels,
          data: percentage || initialChartData.data,
          backgroundColor: background || initialChartData.backgroundColor,
        });
      } else {
        alert(msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    FetchChart();
  }, [props.data]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const data = {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: chartData.backgroundColor,
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        responsive: true,
      };
      if (chartRef.current.chart) {
        // If the chart instance already exists, update the chart data
        chartRef.current.chart.data = data;
        chartRef.current.chart.update();
      } else {
        // Create a new chart instance if it doesn't exist
        chartRef.current.chart = new Chart(ctx, {
          type: 'pie',
          data: data,
          options: options,
        });
      }
    }
  }, [chartData,props.data]);

  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
            <div className="card card-danger">
              <div className="card-header">
                <h3 className="card-title">Last Month Expenses</h3>

                
              </div>
              <div className="card-body">
                <canvas id="pieChart" ref={chartRef} style={{minHeight:'250px',height:'250px',maxHeight:'250px',maxWidth:'100%'}}></canvas>
              </div>
             
            </div>
            </div>
         
        
        </div>
    </div>
      
    </>
  )
}

export default Charts



  

 
