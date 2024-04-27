import {Button, Modal} from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { _fetch } from '../../helper/httpClient';
import Select from 'react-select'
//  ADCAP PESOS PLUS - CLASE A
//  MEGAINVER RETORNO ABSOLUTO - CLASE A

export function FundModalList({asyncGetFundsList}){
    const [show, setShow] = useState(false);
    const [fundList, setFundList] = useState([])
    const [fundOptionSelected, setOptionSelecterd] = useState("0")
    const [isLoading, setIsLoading] = useState(false)
    const [adding, setAdding] = useState(false)
    const handleClose = () => setShow(false);
    const showModal = () => setShow(true);

    const headerEndpoint = "fund/header/"
    const FundsEndpoint = "fund/remote/list/"

    const handleAdd = async(e) => {
        if(fundOptionSelected !== "0"){
            e.target.disabled = true
            setAdding(true)
            await _fetch(headerEndpoint+fundOptionSelected)
            await asyncGetFundsList()
            await asyncUpdateList()
            setAdding(false)
            e.target.disabled = false
        }
    }

    const handleChange = (fund) => {
        setOptionSelecterd(fund.value)
        
    }

    const asyncUpdateList = async () =>{
        setIsLoading(true)
        const 
        jsonResponse = await _fetch(FundsEndpoint),
        tmpList = await jsonResponse.map((tmp) =>  ( {value: tmp.ticker,label: tmp.nombre}))
        setFundList(tmpList)
        setIsLoading(false)
    }

    useEffect(() =>{
        asyncUpdateList()
    },[])

    const handleOnShow = () => {
        asyncUpdateList()
    }

    return (
        <>
            <Button variant="secondary" onClick={showModal}>
                <FaPlusSquare/> Agregar fondo
            </Button>

            <Modal show={show} onHide={handleClose}  onShow={handleOnShow} className="modal-lg">
                <Modal.Header closeButton>
                <Modal.Title>Fondos disponibles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="">Seleccione el fondo a agregar</label>
                    { !isLoading && <Select options={fundList} onChange={handleChange}/>}
                    <br />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    {adding ? "Incorporando" : "Incorporar"}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}