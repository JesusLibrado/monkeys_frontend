'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import ConceptosFacturaTable from './ConceptosFacturaTable';
import IconifyIcon from '@/components/wrappers/IconifyIcon';


import {facturasMockInput} from '../data';
import AgregarConceptosFactura from './AgregarConceptoFactura';


const EstacionTab = (props: {
    estacionId: string,
    nombreEmpleado: string,
    numero: number
}) => {

    const [facturaData, setFactura] = React.useState(facturasMockInput.filter((factura)=>factura.estacionId == props.estacionId)[0]);
    const [agregarConceptoClicked, setAgregarConcepto] = React.useState(false||facturaData?.total==0);

    function toggleAgregarConceptoButton(event: any) {
        event.preventDefault();
        setAgregarConcepto(agregarConceptoClicked?false:true);
    }

    if(!facturaData) {
        return (
            <div className="d-flex align-items-start justify-content-center mb-4">
                <h4>No hay información para mostrar</h4>
            </div>
        );
    }

    const EventoHeader = () => (
        <>
            <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                    <h3 className="m-0 fw-bolder fs-20">Estación # {props.numero}</h3>
                </div>
                <div className="text-end">
                    Evento actualizado hace 12 minutos
                </div>
            </div>
            <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                    <h5 className="fw-bold mb-2 fs-14"> Nombre del cliente: </h5>
                    <h6 className="fs-14 mb-2">{facturaData.evento.nombreCliente}</h6>
                </div>
                <div>
                    <h5 className="fw-bold mb-2 fs-14"> Atendido por: </h5>
                    <h6 className="fs-14 mb-2">{props.nombreEmpleado}</h6>
                </div>
            </div>
            {
                (!agregarConceptoClicked)?
                    <div className='mb-4 d-flex flex-row-reverse gap-2'>
                        <button 
                            type="button" 
                            className={`btn btn-ghost-secondary`}
                            onClick={toggleAgregarConceptoButton}
                        >
                            <IconifyIcon icon='tabler:circle-plus' className="me-1" />
                            agregar producto o servicio
                        </button>
                    </div>:''
            }
        </>
    )

    return (
        <Col sm={12}>
            <Card className="shadow-none border">
                <CardBody>
                    {EventoHeader()}
                    {(agregarConceptoClicked)?
                        <AgregarConceptosFactura facturaId={facturaData.id} onCloseClicked={toggleAgregarConceptoButton}/>:
                        <ConceptosFacturaTable facturaId={facturaData.id} total={facturaData.total}/>
                    }
                    
                </CardBody>
                <div className="d-print-none mb-5">
                    <div className="d-flex justify-content-center gap-2">
                        <button type='button' className="btn btn-outline-danger">
                            Cancelar evento
                        </button>
                        <button type='button' className={`btn btn-primary ${facturaData.total==0?'disabled':''}`}>
                            Realizar pago
                        </button>
                    </div>
                </div>
            </Card>
        </Col>
    );
}

export default EstacionTab;