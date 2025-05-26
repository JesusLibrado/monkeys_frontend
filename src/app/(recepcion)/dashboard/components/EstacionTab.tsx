'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row, Spinner } from 'react-bootstrap';
import ConceptosFacturaTable from './ConceptosFacturaTable';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import CrearConceptoFactura from './CrearConceptoFactura';

import { useQuery, gql } from '@apollo/client';
import { toNameCase } from '@/helpers/strings';
import EmpezarEventoButton from '../../components/EmpezarEventoButton';

// ************** Gql queries ***********

const GET_EVENTO_BY_ESTACION = gql`
    query EventoByEstacion($estacionId: String!) {
        eventoByEstacion(estacionId: $estacionId) {
            id
            nombreCliente
            estatus
            factura {
                id
                estatus
                folio
                total
            }
            createdAt
            updatedAt
        }
    }
`;

const EstacionTab = (props: {
    estacionId: string,
    empleado: {
        id: string,
        nombre: string
    },
    numero: number
}) => {

    const [eventoData, setEventoData] = React.useState<any>({});
    const [agregarConceptoClicked, setAgregarConcepto] = React.useState(false);

    const {loading, error, data, refetch} = useQuery(GET_EVENTO_BY_ESTACION, {
        variables: {estacionId: props.estacionId}
    });

    useEffect(()=>{
        if(data) {
          let eventoByEstacion = data.eventoByEstacion;
          setEventoData(eventoByEstacion);
        }
    }, [data]);

    function updateTab() {
        refetch();
    }

    function toggleAgregarConceptoButton(event: any) {
        event.preventDefault();
        setAgregarConcepto(agregarConceptoClicked?false:true);
    }

    if(loading){
        return (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        );
    }

    if(props.empleado===null) {
        return (
            <div className="d-flex align-items-start justify-content-center mb-4">
                <h5>Esta estación no tiene un barbero asociado. Solicite ayuda a su administrador</h5>
            </div>
        );
    }

    if(!eventoData) {
        return (
            <div className="text-center mb-4">
                <h5>Estación disponible, no hay evento en curso</h5>
                <p className='mt-3'>
                    <EmpezarEventoButton 
                        estacionId={props.estacionId}
                        empleado={props.empleado}
                        numero={props.numero}
                        onSubmit={updateTab}
                    />
                </p>
            </div>
        );
    }


    return (
        <div>
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
                    <h6 className="fs-14 mb-2">{toNameCase(eventoData.nombreCliente??'')}</h6>
                </div>
                <div>
                    <h5 className="fw-bold mb-2 fs-14"> Atendido por: </h5>
                    <h6 className="fs-14 mb-2">{toNameCase(props.empleado.nombre)}</h6>
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
            {(agregarConceptoClicked)?
                <CrearConceptoFactura facturaId={eventoData.factura?.id} onCloseClicked={toggleAgregarConceptoButton}/>:
                <ConceptosFacturaTable facturaId={eventoData.factura?.id}/>
            }
            <div className="d-print-none mb-5">
                <div className="d-flex justify-content-center gap-2">
                    <button type='button' className="btn btn-outline-danger">
                        Cancelar evento
                    </button>
                    <button type='button' className={`btn btn-primary ${eventoData.factura?.total==0?'disabled':''}`}>
                        Realizar pago
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EstacionTab;