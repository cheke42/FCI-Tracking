import { Table,Badge } from "react-bootstrap";
import { useEffect } from 'react';
import { _fetch } from '../../helper/httpClient';
import { FaArrowTrendUp, FaArrowTrendDown} from "react-icons/fa6";


export function TableFund({ ticker , analiticas, setAnaliticas}){

    //-> CONST && VAR
    const 
    urlAnaliticaPeriodica = 'fund/periodicAnalyticalData/',
    tableHeader = ["Fecha","Precio","Variación diaria"]
    
    //-> EFFECTS
    useEffect(() => {
        const asyncUpdateList = async () => {
            let analyticalList = (await _fetch(urlAnaliticaPeriodica+ticker+'/30')).data.reverse()
            setAnaliticas(analyticalList)
        }
        asyncUpdateList()
    }, [ticker,setAnaliticas]);


    return (
        <>
            <Table striped bordered hover className="table">
                <thead className='bg-dark text-white'>
                    <tr>
                        {tableHeader.map((header,i) => <th scope="col" key={`th-${i}`}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { 
                        analiticas && analiticas.map((analitica,i) => {
                            const diff = 
                            analiticas[i-1] ? analitica.precio - analiticas[i-1].precio : 0,
                            perc = (diff !== 0 ? (diff * 100)/analiticas[i-1].precio : 0).toFixed(3),
                            perfomance = perc >= 0 ? (<Badge bg="success">+{perc} <FaArrowTrendUp /></Badge>) : (<Badge bg="danger">{perc} <FaArrowTrendDown/></Badge>);
                            return (
                                <tr className="text-center" key={`analitica-${analitica.ticker}-${analitica.fecha}`}>
                                    <td>{analitica.fecha}</td>
                                    <td>$ {String(analitica.precio).replace('.',',')}</td>
                                    <td>
                                            {perfomance}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        analiticas.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center">Sin datos</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}