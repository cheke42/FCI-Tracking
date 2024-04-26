import { useEffect,useState } from "react";
import {Table,Spinner, Button,Badge } from "react-bootstrap"
import { Link  } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown} from "react-icons/fa6";

export function WalletTable({isLoading,fondos,total,billeteraAnterior}){
    //-> CONST & VAR
    const tableHeader = ["Ticker","Nombre","Cantidad","Valor unitario","Total Parcial","Detalle"]

    //-> STATES
    const 
    [calculatedFunds, setCalculatedFunds] = useState([]),
    [positiveGlobalPerfomance,setPositiveGlobalPerfomance] = useState(false),
    [globalPercentPerfomance, setGlobalPercentPerfomance] = useState(0),
    [globalPerfomance,setGlobalPerfomance] = useState(0),
    [formattedTotal, setFormattedTotal] = useState('')

    //-> EFFECTS
    useEffect(() => {
        const initialCalculation = async(fondos) => {
            let 
            _calculatedFunds = [],
            _previousTotal = 0,
            _positiveGlobalPerfomance = false,
            _globalPercentPerfomance = 0,
            _globalPerfomance = 0
            _calculatedFunds= await fondos.map((f,idx) => {
                    f.partialCurrentTotal = (f.cantidad * f.precio)
                    f.formattedPartialCurrentTotal = f.partialCurrentTotal.toLocaleString('es-ES', {maximumFractionDigits:2})
                    f.partialPreviousTotal = billeteraAnterior[idx].precio * f.cantidad
                    f.diff = (f.partialCurrentTotal - f.partialPreviousTotal).toLocaleString('es-ES', {maximumFractionDigits:2})
                    f.positivePerf = f.partialCurrentTotal >= f.partialPreviousTotal
                    f.porc = (f.partialCurrentTotal * 100 / f.partialPreviousTotal - 100).toFixed(2) + '%'
                    _previousTotal += f.partialPreviousTotal
                    f.formatted_price = f.precio.toLocaleString('es-ES', {maximumFractionDigits:2})
                    return f
            })
            _positiveGlobalPerfomance = total >= _previousTotal
            _globalPercentPerfomance = ((total * 100 / _previousTotal - 100).toFixed(2)).toLocaleString('es-ES', {maximumFractionDigits:2})
            _globalPerfomance = (total - _previousTotal).toLocaleString('es-ES', {minimumFractionDigits: 2})
            setCalculatedFunds(_calculatedFunds)
            setPositiveGlobalPerfomance(_positiveGlobalPerfomance)
            setGlobalPercentPerfomance(_globalPercentPerfomance)
            setGlobalPerfomance(_globalPerfomance)
            setFormattedTotal(total.toLocaleString('es-ES', {minimumFractionDigits: 2}))
        }
        !isLoading && initialCalculation(fondos)
    }, [isLoading,billeteraAnterior,fondos,total]);
    
    return (
        <Table striped bordered hover className="table">
            <thead className='bg-dark text-white'>
                <tr>
                    { tableHeader.map((head,i) => <th scope="col" className="text-center" key={`th-${head.toLowerCase()+i}`}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {isLoading &&
                    <tr className='text-center'>
                        { tableHeader.map((head,i) => <td key={`td-${head.toLowerCase()+i}`}><Spinner animation="grow" variant="info" /></td>) }
                    </tr>
                }{!isLoading && calculatedFunds.map((fund) => 
                    <tr className='text-center' key={`wallet-${fund.ticker}`}> 
                        <td>{fund.ticker}</td>
                        <td>{fund.title}</td>
                        <td>{fund.cantidad}</td>
                        <td><Badge bg="info">{fund.ultima_actualizacion}</Badge><br />${fund.formatted_price}</td>
                        <td className="text-end">
                            <Badge title={'$'+fund.diff} style={{fontSize: "10px"}} bg={fund.positivePerf ? 'success' : 'danger'} pill>
                                {fund.positivePerf ? [`+ $${fund.porc} `,<FaArrowTrendUp key={fund.ticker}/>] : [`- $${fund.porc} `,<FaArrowTrendDown key={fund.ticker} />]}
                            </Badge><br/>
                            ${fund.formattedPartialCurrentTotal}<br/>        
                        </td>
                        <td>
                            <Link className="nav-link" to={`/fondo/detalle/${fund.ticker}`}>
                                <Button variant="primary" key={`btn-${fund.ticker}`}><FaArrowAltCircleRight/> Detalle</Button>
                            </Link>
                        </td>
                    </tr>
                )}                
                <tr>
                    <td className="text-end pe-2" colSpan={5}>
                        TOTAL: <br />
                        <div className="fw-bold" style={{fontSize: '1.25rem'}}>
                            $ {formattedTotal}
                        </div>
                    </td>
                    <td className="text-end">
                        <Badge  style={{fontSize: "10px"}} bg={positiveGlobalPerfomance ? 'success' : 'danger'} pill>
                            {positiveGlobalPerfomance ? [`+ $${globalPercentPerfomance}`,<FaArrowTrendUp key={globalPerfomance}/>] : [`- $${globalPercentPerfomance}`,<FaArrowTrendDown key={globalPerfomance}/>] }
                        </Badge>  <br />
                        $ {globalPerfomance} <br />
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}