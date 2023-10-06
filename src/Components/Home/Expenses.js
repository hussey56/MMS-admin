import React , {useEffect,useRef,useState} from 'react'
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const Expenses = () => {
  const header = useNavigate();
  const [loading,setLoading] = useState(true);
  const initialChartData = {
    labels: ['Employees', 'Water', 'Electricity', 'Gas (SUI)', 'Maintenance', 'Cleaning goods'],
    data: [700, 500, 400, 600, 300, 100],
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
        setLoading(false);
      } else {
        alert(msg);
      }
    } catch (error) {
      header('/down')
    }
  };

  useEffect(() => {
    FetchChart();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData) {
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
          type: 'doughnut',
          data: data,
          options: options,
        });
      }
    }
  }, [chartData]);
  return (
    <>
       <div className="card card-danger">
              <div className="card-header">
                <h3 className="card-title">Last Month Expenses</h3>

              
              </div>
              {loading === true && 
              <div className="text-center">
                loading...
              </div>
              }
              {loading === false && <>
                <div className="card-body">
                <canvas ref={chartRef} id="donutChart" style={{minHeight:'250px',height:'250px',width:'250px',maxWidth:'100%'}} ></canvas>
              </div>
              </>}
             
             {/* <!-- /.card-body -->*/}
            </div> 
    </>
  )
}

export default Expenses

