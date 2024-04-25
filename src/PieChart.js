import React, {useEffect,useRef} from 'react'
import { Chart } from 'chart.js/auto'

export default function PieChart() {
    const chartRef = useRef (null);
    const chartInstance = useRef (null);

    useEffect(() =>{

        if (chartInstance.current){
            chartInstance.current.destroy()
        }

         const myChartRef = chartRef.current.getContext('2d');


         chartInstance.current = new Chart(myChartRef,{
            type:"pie",
            data: {
                labels: ["Wins","Losts"],
                datasets : [  


                    {
                        data: [300, 50,],
                        backgroundColor: [
                        'rgb(60, 179, 113)',
                        'rgb(54, 162, 235)',
                        ],
                    }
                ]
            }
         }

         )
         return () =>{
            if(chartInstance.current){
                chartInstance.current.destroy()
            }
         }
    }, []);

    return (
        <div
            className='w-50'
        >
          <canvas 
          ref={chartRef} 
          style={{ width: "auto", height: "auto" }} 
        
          />
        </div>
      );
    }
