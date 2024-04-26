
import {Table, Badge } from "react-bootstrap"
import { FaArrowTrendUp,FaArrowTrendDown } from "react-icons/fa6"

export function PerfomanceTable({historial}){
    
    const 
    tableHead = ["Fecha","Valor","Variacion"]
    
    let totals = []
    return (
        <Table striped bordered hover className="table">
                <thead className='bg-dark text-white'>
                    <tr>
                        { tableHead.map((head,i) => <th scope="col" className="text-center" key={`th-perfomance-${i}`} >{head}</th>) }
                    </tr>
                </thead>
                <tbody>
                    { historial && historial.slice(0).reverse().map((daily,idx) => {
                        let 
                        totalActual = 0
                        daily.forEach((d) => { totalActual += d.cantidad * d.precio })
                        totals.push(totalActual)
                        let 
                        anterior = (totals[idx-1] ? totals[idx-1] : totalActual),
                        variacion = (totalActual -  anterior).toLocaleString('es-ES', {maximumFractionDigits:2}),
                        rendimientoPositivo = totalActual >= anterior

                        return (
                            <tr className="text-center" key={`tr-${idx}`}>
                                <td>{daily[0].fecha}</td>
                                <td>${(totalActual).toLocaleString('es-ES', {maximumFractionDigits:2})}</td>
                                <td>
                                    <Badge bg={rendimientoPositivo ? 'success' : 'danger'} pill>
                                        ${variacion} &nbsp;
                                        {rendimientoPositivo ? <FaArrowTrendUp/> : <FaArrowTrendDown/>}
                                    </Badge>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
    )
}