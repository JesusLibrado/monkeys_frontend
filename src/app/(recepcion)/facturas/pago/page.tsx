'use client'

import { useRecepcionContext } from "@/context/useRecepcionContext";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import FacturaViewer from "./FacturaViewer";

const PagosPage = () => {

    const params = useSearchParams();
    const [folio, setFolio] = useState(Number(params.get('folio')));
    
 
    return (
        <Row>
            <Col md={12} xl={8} xxl={8}>
                <FacturaViewer folio={folio}/>
            </Col>
        </Row>
    )
}

export default PagosPage;