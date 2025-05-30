import React from 'react'
import Stat from './template/Stat'
import Estaciones from './Estaciones/Estaciones';
import { Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'
import ComponentContainerCard from '@/components/base-ui/ComponentContainerCard';
import {EventoProvider} from '@/context/useEventoContext';

export const metadata: Metadata = { title: 'Recepción' }

const DashboardPage = () => {
  return (
    <>
      {/* <Stat /> */}
      <Row>
        <Col xxl={6} xl={12} lg={12} md={12}>
          <ComponentContainerCard 
            title='Estatus de estaciones'
            description={<>Verifica y administra el estatus de cada estación</>}
          >
            <Estaciones />
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage