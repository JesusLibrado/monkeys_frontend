'use client'

import logoDark from '@/assets/images/logo-dark.png'
import { Row, Col, CardBody, Card } from "react-bootstrap";
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {gql, useMutation, useQuery} from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FacturaInfo  from './FacturaInfo';
import { useRecepcionContext } from '@/context/useRecepcionContext';
import { toSentenceCase } from '@/utils/change-casing';
import ConceptosFactura from './ConceptosFactura';

const GET_FACTURA_BY_FOLIO = gql`
    query FacturaByFolio($folio: Int) {
        facturaByFolio(folio: $folio) {
            id
            evento {
                id
                nombreCliente
                estacion {
                    numero
                    empleado {
                        nombre
                        apellido
                    }
                }
            }
            folio
            total
            descuento
            estatus
            createdAt
            updatedAt
        }
    }
`;

const EstatusFacturaBadge = (props: {
    estatus: string
}) => {

    switch(props.estatus) {
        case "CREADA":
            return (
                <span className="text-end badge badge-outline-danger rounded-pill px-1 fs-12 mb-3"> Pendiente </span>
            );
        case "PAGADA":
            return (
                <span className="text-end badge badge-outline-success rounded-pill px-1 fs-12 mb-3"> Pagada </span>
            );
        case "CANCELADA":
            return (
                <span className="text-end badge badge-outline-dark rounded-pill px-1 fs-12 mb-3"> Cancelada </span>
            );
        default:
            return (
                <p className="placeholder-glow">
                    <span className="placeholder col-12" />
                </p>
            );
    }

}


const FacturaViewer = (props: {
    folio: number
}) => {

    const [facturaData, setFacturaData] = useState<any>({});

    const {data, loading, error} = useQuery(GET_FACTURA_BY_FOLIO, {
        variables: {
            folio: props.folio
        }
    });

    useEffect(()=>{
        if(data) {
            const factura = data.facturaByFolio;
            setFacturaData(factura);
        }
    }, [data]);

    if(!facturaData) {
        return (
            <Card>
                <CardBody>
                    <div className="d-flex align-items-start justify-content-center mb-4">
                        <h5>Factura no encontrada</h5>
                    </div>
                </CardBody>
            </Card>
        );
    }

    if(loading) {
        return (
            <div className="d-flex justify-content-center mt-4">
                <Spinner />
            </div>
        )
    }

    const formattedFolio = () => `${props.folio}`.padStart(5, "0");
    const nombreCliente = (): string => facturaData.evento?facturaData.evento.nombreCliente:'';
    const nombreEmpleado = (): string => {
        if(facturaData.evento?.estacion){
            let estacion = facturaData.evento?.estacion;
            return `${toSentenceCase(estacion.empleado.nombre)} ${toSentenceCase(estacion.empleado.apellido)}`
        } else 
            return '';
    } 
    
    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-start justify-content-between mb-4">
                    <div>
                        <Image src={logoDark} alt="dark logo" height={24} />
                    </div>
                    <div className="text-end">
                        <EstatusFacturaBadge estatus={facturaData.estatus}/>
                        <h3 className="m-0 fw-bolder fs-20">Folio: {formattedFolio()}</h3>
                    </div>
                </div>
                <FacturaInfo  
                    nombreCliente={nombreCliente()}
                    nombreEmpleado={nombreEmpleado()}
                    horaCreacion={facturaData.createdAt}
                    horaActualizacion={facturaData.updatedAt}
                />
            </CardBody>
            <div className='p-2'>
                
                <ConceptosFactura facturaId={facturaData.id} />
                <div>
                    <table className="table table-nowrap align-middle mb-0 ms-auto" style={{ width: 335 }}>
                        <tbody>
                        <tr>
                            <td className="fw-medium">Subtotal</td>
                            <td className="text-end">${facturaData.total}</td>
                        </tr>
                        <tr>
                            <td className="fw-medium">Comisión <small className="text-muted">(Pago con tarjeta)</small>
                            </td>
                            <td className="text-end">-</td>
                        </tr>
                        <tr>
                            <td className="fw-medium">Descuento <small className="text-muted">(?)</small>
                            </td>
                            <td className="text-end">-</td>
                        </tr>
                        <tr className="border-top border-top-dashed fs-16">
                            <td className="fw-bold">Costo total</td>
                            <td className="fw-bold text-end">${facturaData.total}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    )
}

export default FacturaViewer;