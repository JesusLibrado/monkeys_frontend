'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import ConceptosFacturaTable from './ConceptosFacturaTable';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import CrearConceptoFactura from './CrearConceptoFactura';

// ************** HELPERS ***************

import {facturasMockInput} from '../data';

const EstacionTab = (props: {
    estacionId: string,
    empleado: {
        id: string,
        nombre: string
    },
    numero: number
}) => {

    const [facturaData, setFactura] = React.useState(facturasMockInput.filter((factura)=>factura.estacionId == props.estacionId)[0]);
    const [agregarConceptoClicked, setAgregarConcepto] = React.useState(false);

    function toggleAgregarConceptoButton(event: any) {
        event.preventDefault();
        setAgregarConcepto(agregarConceptoClicked?false:true);
    }

    if(props.empleado===null) {
        return (
            <div className="d-flex align-items-start justify-content-center mb-4">
                <h4>Esta estación no tiene un barbero asociado. Solicite ayuda a su administrador</h4>
            </div>
        );
    }

    if(!facturaData) {
        return (
            <div className="text-center mb-4">
                <h5>Estación disponible, no hay evento en curso</h5>
                <p className='mt-3'>
                    <button type="button" className="btn btn-ghost-primary">
                        Empezar evento
                    </button>
                </p>
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
                    <h6 className="fs-14 mb-2">{props.empleado.nombre}</h6>
                </div>
            </div>
            {
                (!agregarConceptoClicked)?
                    <div className='mb-4 d-flex flex-row-reverse gap-2'>
                        <button 
                            type="button" 
                            className={`btn btn-ghost-info`}
                            onClick={toggleAgregarConceptoButton}
                        >
                            <IconifyIcon icon='tabler:circle-plus' className="me-1 fs-16" />
                            cotizar greca u otro servicio
                        </button>
                    </div>:''
            }
        </>
    )

    return (
        <div>
            {EventoHeader()}
            {(agregarConceptoClicked)?
                <CrearConceptoFactura facturaId={facturaData.id} onCloseClicked={toggleAgregarConceptoButton}/>:
                <ConceptosFacturaTable facturaId={facturaData.id}/>
            }
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
        </div>
    );
}

export default EstacionTab;