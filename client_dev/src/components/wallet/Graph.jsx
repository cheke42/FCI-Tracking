import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { _fetch } from '../../helper/httpClient';

export function Graph({selectedFund,historial,total}){
    
    //-> CONST && VAR
    ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
    const periodicAnalyticalURL = "fund/periodicAnalyticalData/"

    //-> STATES
    const 
    [analyticals,setAnalyticals] = useState({labels: [],datasets: [{label: 'Loading',data: []}]}),
    [isLoading,setIsLoading] = useState(true),
    [options, setOptions] = useState({scales : { y : {min : 0}, x: {ticks: { color: 'rgb(255, 99, 132)'}}}})

    //-> EFFECTS
    useEffect(() =>{
        const _getMinMaxWithMath = (arr) => {
            let 
            maximum = Math.max(...arr),
            minimum = Math.min(...arr)
            return {minimum,maximum}
        }

        if(selectedFund.ticker){
            const asyncGetFundAnalytical = async () =>{
                setAnalyticals(true)
                let 
                analyticals = (await _fetch(`${periodicAnalyticalURL}${selectedFund.ticker}/30`)).data.reverse(),
                analyticalDate = analyticals.map(({fecha}) => `${fecha}`),
                analyticalPrice = analyticals.map(({precio}) => precio),
                {min,max} = _getMinMaxWithMath(analyticalPrice)
                setAnalyticals({labels: analyticalDate,datasets: [{label: selectedFund.title,data: analyticalPrice,fill: false,borderColor: '#0d6efd',backgroundColor: '#20c997',borderWidth: 1, pointStyle: 'triangle', pointRadius: 10, pointBorderColor: 'rgb(0, 0, 0)'}]})
                setOptions({plugins: {legend: {position: 'bottom'}},scales : { y : {min,max}, x: {ticks: { color: 'black'}}}})
                setIsLoading(false)
            }
            asyncGetFundAnalytical()
        }else{
            const asyncGetGeneralFundAnalytical = async () =>{
                await historial
                let 
                analyticalPrice = [],
                analyticalDate = []
                historial.forEach((dataByDate) => {
                    analyticalDate.unshift(dataByDate[0].fecha)
                    let dayValue = 0.0
                    dataByDate.forEach((fund) => {
                        dayValue += fund.precio * fund.cantidad
                    })
                    analyticalPrice.unshift(dayValue)
                    dayValue = 0.0
                })
                analyticalPrice.push(total)
                analyticalDate.push("Actual")
                let{min,max} = _getMinMaxWithMath(analyticalPrice)
                setAnalyticals({labels: analyticalDate,datasets: [{label: selectedFund.title,data: analyticalPrice,fill: false,borderColor: '#0d6efd',backgroundColor: '#20c997',borderWidth: 1, pointStyle: 'triangle', pointRadius: 10, pointBorderColor: 'rgb(0, 0, 0)'}]})
                setOptions({plugins: {legend: {position: 'bottom'}},scales : { y : {min,max}, x: {ticks: { color: 'black'}}}})
                setIsLoading(false)        
            }
            setAnalyticals([])
            asyncGetGeneralFundAnalytical()
        }   
    },[selectedFund,historial,total])
    
    return (
        <div className="border">
            <h2 className="text-center mt-4 mb-1">{selectedFund ? (selectedFund.title) : ("RESUMEN GENERAL") }</h2>
            <div className="m-4">
                {!isLoading && analyticals && <Line data={analyticals} options={options}/>}
            </div>
        </div>
    )
}
