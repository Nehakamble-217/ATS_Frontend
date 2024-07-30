 /* Name:-Prachi Parab Component:-PieChart report
         End LineNo:-1 to 105 Date:-10/07 */

         import React from 'react';
         import "../Reports/PieChartReport.css";
         import { Pie } from 'react-chartjs-2';
         import { Chart, ArcElement,Tooltip } from 'chart.js';
         
         Chart.register(Tooltip);
         Chart.register(ArcElement);
         
         const PieChart = ({data}) => {
           
           const tableData = {
             labels: data.map(item => item.status),
         
             datasets: [
               {
                 label: '',
                 data:  data.map(item => item.CandidateCount),
                 backgroundColor: [
                   'rgba(255, 99, 132, 0.6)',
                   'rgba(54, 162, 235, 0.6)',
                   'rgba(255, 206, 86, 0.6)',
                   'rgba(75, 192, 192, 0.6)',
                   'rgba(153, 102, 255, 0.6)',
                   'rgba(255, 159, 64, 0.6)',
                   'rgba(0, 255, 255, 0.6)',     
                   'rgba(255, 0, 255, 0.6)',     
                   'rgba(0, 255, 0, 0.6)',       
                   'rgba(255, 192, 203, 0.6)',   
                   'rgba(0, 128, 128, 0.6)',     
                   'rgba(230, 230, 250, 0.6)',   
                   'rgb(88, 165, 122, 0.6)',
                   'rgb(59, 48, 94, 0.6)',
                   'rgb(132, 175, 206, 0.6)',
                   'rgb(228, 112, 229, 0.6)',
                   'rgb(157, 33, 80, 0.6)'
         
                 ],
                 borderWidth: 2,
                 hoverOffset: 5,
               
                 
               },
               
             ],
            
             
           };
           const options = {
             tooltips: {
                 callbacks: {
                     label: function(tooltipItem, chartData) {
                         const dataset = chartData.datasets[tooltipItem.datasetIndex];
                         const label = chartData.labels[tooltipItem.index];
                         const value = dataset.data[tooltipItem.index];
                         
                         return `${label}: ${value}`;
                     }
                 }
             }
         };
         
         
         
         
           // if (!data || !data.datasets || data.datasets.length === 0 || !data.datasets[0].data || data.datasets[0].data.length === 0) {
           //   // Handle empty or invalid data scenario
           //   return <div>No data available for the pie chart</div>;
           // }
           
         
           return (
             <div className="chart-container">
               <div className='piechart-container'>
               <Pie data={tableData}  options={options}/>
               </div>
               <div>
                   <div className='piechrt-legends'>
                   <h5 className='text-index-piechart'>Index</h5>
                     <div className='piechart-legend-flex'>
                     
                   <ul className="legend">
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(255, 99, 132, 0.6)'}}></span> Selected</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(54, 162, 235, 0.6)'}} ></span> Rejected</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(255, 206, 86, 0.6)'}}></span> LineUp</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(75, 192, 192, 0.6)'}}></span> Hold</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(153, 102, 255, 0.6)'}}></span> Dropout</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(255, 159, 64, 0.6)'}}></span> Join</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(0, 255, 255, 0.6)'}} ></span> Not Join</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(255, 0, 255, 0.6)'}}></span> Active</li>
                    
                   </ul>
                   <div className='piechart-legend-flex'>
                   <ul className="legend">
                   <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(0, 255, 0, 0.6)'}}></span> InActive</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(255, 192, 203, 0.6)'}}></span> Round 1</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(0, 128, 128, 0.6)'}}></span> Round 2</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(230, 230, 250, 0.6)'}} ></span> Round 3</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(88, 165, 122, 0.6)'}}></span> Round 4</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(59, 48, 94, 0.6)'}}></span> Round 5</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(132, 175, 206, 0.6)'}}></span> Round 6</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(228, 112, 229, 0.6)'}}></span> Yet To Schedule</li>
                     <li className="legend-item"><span className="legend-color" style={{backgroundColor:'rgba(157, 33, 80, 0.6)'}}></span> No Show</li> 
                     </ul>
                     </div>
         
                   </div>
         
         
         
         
         
                 </div>
         
         
               </div>
         
               
             </div>
           );
         };
         
         export default PieChart;