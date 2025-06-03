'use client'

import logoDark from '@/assets/images/logo-dark.png'
import { Row, Col, CardBody, Card } from "react-bootstrap";
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PagosPage = () => {

    const params = useSearchParams();
    const [folio, setFolio] = useState(params.get('folio'));

    const getFolio = () => `${folio}`.padStart(5, "0");
 
    return (
        <Row>
            <Col md={12} xl={8} xxl={8}>
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-start justify-content-between mb-4">
                            <div>
                                <Image src={logoDark} alt="dark logo" height={24} />
                            </div>
                            <div className="text-end">
                                <span className="text-end badge badge-outline-danger rounded-pill px-1 fs-12 mb-3"> Pendiente </span>
                                <h3 className="m-0 fw-bolder fs-20">Folio: {getFolio()}</h3>
                            </div>
                        </div>
                        <Row>
                            <Col md={5}>
                                <div className='mb-4'>
                                    <h5 className="fw-bold mb-2 fs-14"> Nombre del cliente: </h5>
                                    <h6 className="fs-14 mb-2">Juan Javier</h6>
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-2 fs-14"> Fecha de creación: </h5>
                                    <h6 className="fs-14 mb-2">13 de mayo del 2025, 13:30 horas</h6>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className='mb-4'>
                                    <h5 className="fw-bold mb-2 fs-14"> Atendido por: </h5>
                                    <h6 className="fs-14 mb-2">Uriel Velasco</h6>
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-2 fs-14"> Fecha de pago: </h5>
                                    <h6 className="fs-14 mb-2">13 de mayo del 2025, 14:30 horas</h6>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default PagosPage;