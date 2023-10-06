import React, { useEffect,useRef } from 'react'
import Chart from 'chart.js/auto';

const Profit = () => {
    Chart.register({
        id: 'linechart',
        controller: 'linechart',
        element: 'linechart',
       
      });
   const areaChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    // scales: {
    //   xAxes: [{
    //     gridLines : {
    //       display : true,
    //     }
    //   }],
    //   yAxes: [{
    //     gridLines : {
    //       display : true,
    //     }
    //   }]
    // }
  }
const areaChartData ={
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : '2023',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label               : '2022',
        backgroundColor     : 'rgba(210, 214, 222, 1)',
        borderColor         : 'rgba(210, 214, 222, 1)',
        pointRadius         : false,
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

      const lineChartRef = useRef(null);

      useEffect(() => {
        const lineChartCanvas = lineChartRef.current.getContext('2d');
        const lineChartOptions = {...areaChartOptions};
        const lineChartData = {...areaChartData};
        lineChartData.datasets[0].fill = false;
        lineChartData.datasets[1].fill = false;
        lineChartOptions.datasetFill = false;
    
        const lineChart = new Chart(lineChartCanvas, {
          type: 'line',
          data: lineChartData,
          options: lineChartOptions
        });
    
        return () => {
          lineChart.destroy();
        }
      },
      // eslint-disable-next-line 
      []);
  return (
    <>
         <div className="col-6">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Profit 2022 & 2023</h3>
              </div>
              <div className="card-body">
                <div className="chart">
                  <canvas id="lineChart" ref={lineChartRef} style={{minHeight:'250px',height:'250px',maxHeight:'250px',maxWidth:'100%'}}></canvas>
                </div>
              </div>
            
            </div>
            </div>
    </>
  )
}

export default Profit
