'use client'

import React, { useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AgregarConceptoFactura from './AgregarConceptoFactura';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { toNameCase } from '@/helpers/strings';

// ************** Gql queries ***********

const GET_CONCEPTOS_FROM_FACTURA = gql`
    query ConceptosFactura($facturaId: String!) {
        conceptosFactura(facturaId: $facturaId) {
            id
            cantidad
            total
            producto {
                id
                nombre
                marca
                precioPublico
            }
            servicio {
                id
                nombre
                categoria
                precio
            }
        }
    }
`;

// ************** Gql mutations ***********

const REMOVE_CONCEPTO_FROM_FACTURA = gql`
    mutation RemoveConceptoFactura($removeConceptoFacturaId: String!) {
    removeConceptoFactura(id: $removeConceptoFacturaId) {
            id
        }
    }
`;




const ConceptosFacturaTable = (props: {
    facturaId: string
}) => {

    const [conceptosFacturaData, setConceptosFactura] = React.useState<any[]>([]);

    const {loading, error, data, refetch} = useQuery(GET_CONCEPTOS_FROM_FACTURA, {
        variables: {facturaId: props.facturaId}
    });

    const [removeConceptoFactura, {loading: removing, error: removeError, data: deletedConcepto}] = useMutation(REMOVE_CONCEPTO_FROM_FACTURA);

    useEffect(()=>{
            if(data) {
                let conceptosFactura = data.conceptosFactura;
                setConceptosFactura(conceptosFactura);
            }
            if(deletedConcepto) {
                refetch();
            }
        }, [data, deletedConcepto]);

    if(loading || removing){
        return (
          <div className="d-flex justify-content-center mb-4">
            <Spinner />
          </div>
        );
    }

    function addConceptoFactura(newCF: any) {
        setConceptosFactura([...conceptosFacturaData||[], newCF])
    }

    function deleteRow(conceptoId: any) {
        removeConceptoFactura({
            variables: {
                removeConceptoFacturaId: conceptoId
            }
        });
    }

    const getTotalFactura = ()=> (conceptosFacturaData||[]).reduce((acc, current)=>{return current.total+acc}, 0)

    return (
        <div className='mb-5'>
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
                        <AgregarConceptoFactura facturaId={props.facturaId} addConceptoFactura={addConceptoFactura}/>
                        {
                            (conceptosFacturaData||[]).map((concepto, idx) => {
                                let titulo = `${concepto.servicio?.categoria} ${concepto.servicio?.nombre}`
                                let precio = concepto.servicio?.precio;
                                if(concepto.producto && Object.keys(concepto.producto).length > 0){
                                    titulo = `${concepto.producto?.nombre} ${toNameCase(concepto.producto?.marca)}`
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
                                                onClick={()=>deleteRow(concepto.id)}
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
                <table className="table table-nowrap align-middle mt-2 ms-auto" style={{ width: 335 }}>
                    <tbody>
                        <tr className="fs-16">
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