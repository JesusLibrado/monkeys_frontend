'use client'

import { useRouter } from 'next/navigation';
import {gql, useMutation} from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const SAVE_FACTURA = gql`
    mutation SaveFactura($facturaId: String!) {
        saveFactura(id: $facturaId) {
            id
            folio
            total
            estatus
            createdAt
            updatedAt
        }
    }
`;

const RealizarPagoButton = (props: {
    facturaId: string
}) => {

    const router = useRouter();

    const [saveFactura, {data, loading, error}] = useMutation(SAVE_FACTURA);

    useEffect(()=>{
        if(data) {
            const factura = data.saveFactura;
            redirect(factura.folio);
        }
    }, [data]);

    function redirect(folio: number) {
        router.push(`facturas/pago?folio=${folio}&redirect=dashboard`);
    }

    function submit() {
        saveFactura({
            variables: {
                facturaId: props.facturaId
            }
        })
    }

    return (
        <button 
            type='button' 
            className={`btn btn-primary`}
            onClick={submit}
        >
            {
                loading?
                    <Spinner />
                    :
                    'Realizar pago'
            }
        </button>
    )
}

export default RealizarPagoButton;