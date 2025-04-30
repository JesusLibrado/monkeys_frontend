'use client'

import React, { useEffect } from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

import {conceptosFacturaMockInput} from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const ConceptosFacturaTable = (props: {
    id: string,
    total: number
}) => {

    const [conceptosFacturaData, setConceptosFactura] = React.useState(conceptosFacturaMockInput.filter((cf)=>cf.facturaId == props.id).map(cp=>cp.conceptosFactura)[0]);

    if(conceptosFacturaData.length < 1) {
        return (
            <h4>No hay información para mostrar, agrega servicios o productos a este evento</h4>
        );
    }

    return (
        <div>
            <div className={'table-response'}>
                <table className="table text-center table-nowrap align-middle mb-0">
                    <thead>
                    <tr className="bg-light bg-opacity-50">
                        <th className="border-0" scope="col" style={{ width: 50 }}>#</th>
                        <th className="text-start border-0" scope="col">Concepto</th>
                        <th className="border-0" scope="col">Cantidad</th>
                        <th className="border-0" scope="col">Precio</th>
                        <th className="text-end border-0" scope="col">Total</th>
                        <th className="text-end border-0" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody id="products-list">
                        {
                            conceptosFacturaData.map((concepto, idx) => {
                                let producto = concepto.producto;
                                let titulo = `${producto?producto.nombre:concepto.servicio?.nombre} ${producto?producto.marca:concepto.servicio?.categoria}`;
                                let precio = producto?producto.precioPublico:concepto.servicio?.precio;
                                return (
                                    <tr key={idx}>
                                        <th scope="row">0{idx + 1}</th>
                                        <td className="text-start">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-medium">{titulo}</span>
                                        </div>
                                        </td>
                                        <td>{concepto.cantidad}</td>
                                        <td>${precio}</td>
                                        <td className="text-end">${concepto.total}</td>
                                        <td className="text-end">
                                            <button type="button" className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger">
                                                <IconifyIcon icon="solar:trash-bin-trash-bold-duotone" className="fs-20" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table table-nowrap align-middle mb-0 ms-auto" style={{ width: 335 }}>
                    <tbody>
                        <tr className="border-top border-top-dashed fs-16">
                            <td className="fw-bold">Total a pagar</td>
                            <td className="fw-bold text-end">${props.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConceptosFacturaTable;