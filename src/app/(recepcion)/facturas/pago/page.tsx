'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import FacturaView from "./FacturaView";
import { gql, useQuery } from "@apollo/client";
import PagoForm from "./PagoForm";

const GET_FACTURA_BY_FOLIO = gql`
    query FacturaByFolio($folio: Int) {
        facturaByFolio(folio: $folio) {
            id
            total
            estatus
            createdAt
            updatedAt
        }
    }
`;

const PagosPage = () => {

    const params = useSearchParams();
    const [folio] = useState(Number(params.get('folio')));
    
    const [facturaData, setFacturaData] = useState<any>({});
    
    const {data, loading, error} = useQuery(GET_FACTURA_BY_FOLIO, {
        variables: {
            folio: folio
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
                    <div className="d-flex align-items-start justify-content-center mb-4 mt-4">
                        <h5>Factura no encontrada</h5>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <Row>
            <Col md={12} xl={8} xxl={8}>
                <FacturaView facturaId={facturaData.id}/>
            </Col>
            {
                facturaData.estatus === "CREADA" && (
                <Col md={12} xl={4} xxl={4}>
                    <PagoForm facturaId={facturaData.id} total={facturaData.total}/>
                </Col>)
            }
            
        </Row>
    )
}

export default PagosPage;