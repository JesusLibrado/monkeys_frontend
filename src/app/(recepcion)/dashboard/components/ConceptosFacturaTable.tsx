'use client'

import React, { useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AgregarConceptoFactura from './AgregarConceptoFactura';

// ************** HELPERS ***************
import {conceptosFacturaMockInput} from '../data';


const ConceptosFacturaTable = (props: {
    facturaId: string
}) => {

    const [conceptosFacturaData, setConceptosFactura] = React.useState(
        conceptosFacturaMockInput.filter((cf)=>cf.facturaId == props.facturaId).map(cp=>cp.conceptosFactura)[0]
    );

    function addConceptoFactura(newCF: any) {
        setConceptosFactura([...conceptosFacturaData||[], newCF])
    }

    function removeConceptoFactura(conceptoId: any) {
        setConceptosFactura(conceptosFacturaData.filter((cf)=>cf.id!=conceptoId));
    }

    const getTotalFactura = ()=> (conceptosFacturaData||[]).reduce((acc, current)=>{return current.total+acc}, 0)

    return (
        <div>
            <div className={'table-response-sm'}>
                <table className="table text-center table-nowrap align-middle mb-0 table-sm">
                    <thead>
                    <tr className="bg-light bg-opacity-50">
                        <th className="border-0" scope="col" style={{ width: 50 }}>#</th>
                        <th className="text-start border-0" scope="col">Concepto</th>
                        <th className="border-0" scope="col" style={{ width: 50 }}>Cantidad</th>
                        <th className="border-0" scope="col" >Precio</th>
                        <th className="text-end border-0" scope="col">Total</th>
                        <th className="text-end border-0" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody id="products-list">
                        <AgregarConceptoFactura addConceptoFactura={addConceptoFactura}/>
                        {
                            (conceptosFacturaData||[]).map((concepto, idx) => {
                                let titulo, precio;
                                if(!concepto.producto || Object.keys(concepto.producto).length < 1){
                                    titulo = `${concepto.servicio?.categoria} ${concepto.servicio?.nombre}`
                                    precio = concepto.servicio?.precio
                                } else {
                                    titulo = `${concepto.producto?.nombre} ${concepto.producto?.marca}`
                                    precio = concepto.producto.precioPublico;
                                }

                                return (
                                    <tr key={concepto.id}>
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
                                            <button 
                                                type="button" 
                                                className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                                                onClick={()=>removeConceptoFactura(concepto.id)}
                                            >
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
                            <td className="fw-bold text-end">${getTotalFactura()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConceptosFacturaTable;