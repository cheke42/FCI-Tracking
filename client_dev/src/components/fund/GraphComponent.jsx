import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export function GraphComponent({analiticas,header,title}){
    ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 
    
    const 
    [analyticals,setAnalyticals] = useState({labels: [],datasets: [{label: 'Loading',data: []}]}),
    [isLoading,setIsLoading] = useState(true),
    [options, setOptions] = useState({scales : { y : {min : 0}, x: {ticks: { color: 'rgb(255, 99, 132)'}}}})
    

    const getMinMaxWithMath = (arr) => {
        let 
        maximum = Math.max(...arr),
        minimum = Math.min(...arr)
        return {minimum,maximum}
    }


    

    useEffect(() =>{
        const orderData = async () =>{
            await analiticas
            setIsLoading(true)
            let 
            analyticalDate = analiticas.map(({fecha}) => `${fecha}`),
            analyticalPrice = analiticas.map(({precio}) => precio),
            {min,max} = getMinMaxWithMath(analyticalPrice)
            setAnalyticals({labels: analyticalDate,datasets: [{label: header.title,data: analyticalPrice,fill: false,borderColor: '#0d6efd',backgroundColor: '#20c997',borderWidth: 1, pointStyle: 'triangle', pointRadius: 10, pointBorderColor: 'rgb(0, 0, 0)'}]})
            setOptions({plugins: {legend: {position: 'bottom'}},scales : { y : {min,max}, x: {ticks: { color: 'black'}}}})
            setIsLoading(false)
          }
        orderData()
    },[header,analiticas])


    return (
          <div className="border">
            <h2 className="text-center mt-4 mb-1">{title}</h2>
            <div className="m-4">
                {!isLoading && analyticals && <Line data={analyticals} options={options}/>}
            </div>
          </div>   
    )
}